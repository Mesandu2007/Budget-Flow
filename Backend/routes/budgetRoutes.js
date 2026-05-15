const express=require("express");
const router=express.Router();

const{
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    checkBudget,

}=require("../controllers/budgetController");

const protect=require("../middleware/authMiddleware");


router.get("/",protect,getBudgets);
router.post("/",protect,createBudget);
router.put("/:id",protect,updateBudget);
router.delete("/:id",protect,deleteBudget);


router.get("/check", protect, checkBudget);

module.exports = router;