const FinanceModel = require("../models/finance");

async function handleGetFinance(req, res) {
  const data = req.body;
  const type = req.params.type;
  if (type == "time") {
    const finances = await FinanceModel.find();
    const intervalType = data.intervalType;
    const selectedTimeInterval = data.timeInterval;
    let transactionAmount = 0;
    let financeData = [];
    if (intervalType == "date") {
      for (let finance in finances) {
        if (finance.date == Date(selectedTimeInterval)) {
          transactionAmount += finance.amount;
          financeData.push({
            title: finance.title,
            nature: finance.nature,
            category: finance.category,
            subCategory: finance.subCategory,
            amount: finance.amount,
          });
        }
      }
    } else if (intervalType == "month") {
      for (let finance in finances) {
        if (finance.date.toString().slice(3, 5) == selectedTimeInterval) {
          transactionAmount += finance.amount;
          financeData.push({
            title: finance.title,
            nature: finance.nature,
            category: finance.category,
            subCategory: finance.subCategory,
            amount: finance.amount,
          });
        }
      }
    } else if (intervalType == "year") {
      for (let finance in finances) {
        if (finance.date.toString().slice(5, 9) == selectedTimeInterval) {
          transactionAmount += finance.amount;
          financeData.push({
            title: finance.title,
            nature: finance.nature,
            category: finance.category,
            subCategory: finance.subCategory,
            amount: finance.amount,
          });
        }
      }
    } else {
        res.status(500).json({ message: e.message });
    }
    res.json({
      financeData: financeData,
      transactionAmount: transactionAmount,
    });
  } else if (type == "nature") {
    const selectedNature = data.nature;
    const finances = await FinanceModel.find({ nature: selectedNature });
    let transactionAmount = 0;
    for (let finance in finances) {
      transactionAmount += finance.amount;
    }
    res.json({ financeData: finances });
  } else if (type == "category") {
    const selectedCategory = data.category;
    const finances = await FinanceModel.find({ category: selectedCategory });
    let transactionAmount = 0;
    for (let finance in finances) {
      transactionAmount += finance.amount;
    }
    res.json({ financeData: finances, transactionAmount: transactionAmount });
  } else if (type == "subcategory") {
    const selectedSubCategory = data.subCategory;

    const finances = await FinanceModel.find({
      subCategory: selectedSubCategory,
    });
    let transactionAmount = 0;
    for (let finance in finances) {
      transactionAmount += finance.amount;
    }
    res.json({ financesData: finances, transactionAmount: transactionAmount });
  } else {
    const finances = await FinanceModel.find();
    let transactionAmount = 0;
    for (let finance in finances) {
      transactionAmount += finance.amount;
    }
    res.json({ financeData: finances, transactionAmount: transactionAmount });
  }
}

async function handleCreateFinance(req, res) {
  const data = req.body;
  try {
    const financeData = await FinanceModel.Create({
      title: data.title,
      date: data.date,
      nature: data.nature,
      category: data.category,
      subCategory: data.subCategory,
      amount: data.amount,
    });
    res.json({
      status: 200,
      message: "Data Saved Successfully.",
      financeData: financeData,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function handleUpdateFinance(req, res) {
  const data = req.body;
  try {
    const financeData = await FinanceModel.find({ _id: data.id });
    const updateField = data.updateField;
    const updateValue = data.updateValue;
    // financeData.updateField = updateValue;
    financeData[updateField] = updateValue;
    await financeData.save();
    res.json({
      message: "Data Updated Successfully",
      financeData: financeData,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function handleDeleteFinance(req, res) {
  const data = req.body;
  try {
    await FinanceModel.deleteOne({ _id: data.id });
    res.status(200).json({  message: "Data Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  handleCreateFinance,
  handleDeleteFinance,
  handleGetFinance,
  handleUpdateFinance,
};
