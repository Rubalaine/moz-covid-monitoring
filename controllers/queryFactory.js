const express = require("express");
exports.createOne = (Model) => async (request, response) => {
  try {
    console.log("dado a ser inserido: ", request.body);
    const doc = await Model.create(request.body);
    response.status(201).json({
      status: "succes",
      doc,
    });
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getMany = (Model) => async (request, response) => {
  try {
    const doc = await Model.find();
    if (!doc) return response.status(204);
    response.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.updateOne = (Model) => async (request, response) => {
  try {
    const doc = await Model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!doc)
      return response.status(404).json({
        status: "fail",
        message: "no document found",
      });
    response.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getOne = (Model) => async (request, response) => {
  try {
    const doc = await Model.findById(request.params.id);
    //console.log({ doc });
    if (!doc)
      return response.status(404).json({
        status: "fail",
        message: "no document found",
      });
    response.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    console.log(error.stack);
    response.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
