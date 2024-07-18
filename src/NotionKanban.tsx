// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState } from "react";
import { motion } from "framer-motion";

const NotionKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-400"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Progress"
        column="doing"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-green-500"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({ title, headingColor, column, cards, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
    highlightIndicator(e);
  };


  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators)
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1"
  };

  const clearHighlights = (elements) => {
    const indicators = elements || getIndicators();
    indicators.forEach((i) => i.style.opacity = "0")
  }

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column=${column}]`));
  };

  const handleDragLeave = (e) => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e) => {
    setActive(false);
    clearHighlights();
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || -1;
    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = {...cardToTransfer, column};

      copy = copy.filter((c) => c.id !== cardId)

      const moveBack = before === "-1"

      if (moveBack) {
        copy.push(cardToTransfer);
      } 
      else {
        const insertAtIndex = copy.findIndex((el) => el.id === before)
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }

    cardToTransfer = { ...cardToTransfer, column };
  };

  const filteredCards = cards.filter((card) => card.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((card) => {
          return (
            <Card handleDragStart={handleDragStart} key={card.id} {...card} />
          );
        })}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActive(false);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    // const card =
    setCards((prev) => prev.filter((card) => card.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      <span className={`${active ? "animate-bounce" : ""}`}>DELETE</span>
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task"
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
        </motion.button>
      )}
    </>
  );
};

const DEFAULT_CARDS = [
  { title: "Task 1", id: "1", column: "backlog" },
  { title: "Task 2", id: "2", column: "backlog" },
  { title: "Task 3", id: "3", column: "backlog" },
  { title: "Task 4", id: "4", column: "doing" },
  { title: "Task 5", id: "5", column: "done" },
  { title: "Task 6", id: "6", column: "done" },
  { title: "Buy groceries", id: "7", column: "backlog" },
  { title: "Finish homework", id: "8", column: "backlog" },
  { title: "Call mom", id: "9", column: "doing" },
  { title: "Go for a run", id: "10", column: "doing" },
  { title: "Read a book", id: "11", column: "done" },
  { title: "Watch a movie", id: "12", column: "done" },
];

export default NotionKanban;
