import { useEffect, useState } from "react";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../api/axios";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    month: "",
    amount: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getBudgets();
    setBudgets(res.data);
  };

  const openAdd = () => {
    setForm({ month: "", amount: "" });
    setEditId(null);
    setOpen(true);
  };

  const openEdit = (b) => {
    setForm(b);
    setEditId(b._id);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateBudget(editId, form);
    } else {
      await createBudget(form);
    }

    setOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    await deleteBudget(id);
    load();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Budgets</h2>

        <button
          onClick={openAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add Budget
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {budgets.map((b) => (
          <div
            key={b._id}
            className="bg-white p-3 shadow flex justify-between"
          >
            <div>
              <p className="font-bold">{b.month}</p>
              <p>{b.amount}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(b)}
                className="text-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(b._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-lg font-bold mb-4">
              {editId ? "Edit Budget" : "Add Budget"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                className="border w-full p-2"
                placeholder="2026-01"
                value={form.month}
                onChange={(e) =>
                  setForm({ ...form, month: e.target.value })
                }
              />

              <input
                className="border w-full p-2"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              <div className="flex justify-between mt-4">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button className="bg-green-600 text-white px-4 py-2 rounded">
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