import { useEffect, useState } from "react";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/axios";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "food",
    description: "",
    date: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* OPEN ADD MODAL */
  const openAdd = () => {
    setForm({
      amount: "",
      type: "expense",
      category: "food",
      description: "",
      date: "",
    });

    setEditId(null);
    setOpen(true);
  };

  /* OPEN EDIT MODAL */
  const openEdit = (t) => {
    setForm({
      amount: t.amount,
      type: t.type,
      category: t.category,
      description: t.description,
      date: t.date
        ? new Date(t.date).toISOString().split("T")[0]
        : "",
    });

    setEditId(t._id);
    setOpen(true);
  };

  /* CREATE / UPDATE */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateTransaction(editId, form);
      } else {
        await createTransaction(form);
      }

      setOpen(false);
      load();
    } catch (err) {
      console.log(err);
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      load();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Transactions
        </h2>

        <button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Transaction
        </button>
      </div>

      {/* TRANSACTION LIST */}
      <div className="space-y-3">

        {transactions.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >

            {/* LEFT */}
            <div>
              <div className="flex items-center gap-2">

                <p className="font-semibold capitalize">
                  {t.category}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded-full text-white ${
                    t.type === "income"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {t.type}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                {t.description || "No description"}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(t.date).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              <p className="font-bold text-lg">
                Rs. {t.amount}
              </p>

              <button
                onClick={() => openEdit(t)}
                className="text-yellow-500 hover:text-yellow-600 font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t._id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

            <h2 className="text-xl font-bold mb-5">
              {editId ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* AMOUNT */}
              <input
                type="number"
                placeholder="Amount"
                className="border w-full p-3 rounded-lg"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              {/* TYPE */}
              <select
                className="border w-full p-3 rounded-lg"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              {/* CATEGORY */}
              <select
                className="border w-full p-3 rounded-lg"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="bills">Bills</option>
                <option value="shopping">Shopping</option>
                <option value="salary">Salary</option>
                <option value="other">Other</option>
              </select>

              {/* DESCRIPTION */}
              <input
                type="text"
                placeholder="Description"
                className="border w-full p-3 rounded-lg"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              {/* DATE */}
              <input
                type="date"
                className="border w-full p-3 rounded-lg"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}