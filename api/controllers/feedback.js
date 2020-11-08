//const { Feedback } = require("@material-ui/icons");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Feedback = require("../../models/feedback");

exports.get_feedback = (req, res) => {
  Feedback.find()
    .exec()
    .then((result) => {
      // console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.post_feedback = (req, res) => {
  // console.log(req.body.username);
  // console.log(req.body.coursename);
  // console.log(req.body.rating);
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    coursename: req.body.coursename,
    rating: req.body.rating,
  });

  feedback
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ msg: "Successfullt posted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error Occurred" });
    });
};
exports.post_feedbacksummary = (req, res) => {
  console.log(req.body.username);
  console.log(req.body.coursename);
  console.log(req.body.rating);
  console.log(req.body.comments);
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    coursename: req.body.coursename,
    rating: req.body.rating,
    comments: req.body.comments,
  });

  feedback
    .save()
    .then((result) => {
      // console.log(result);
      res.status(200).json({ msg: "Successfullt posted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error Occurred" });
    });
};

exports.get_feedbacksummary = (req, res) => {
  Feedback.find()
    .exec()
    .then((result) => {
      // console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.delete_feedback = (req, res) => {
  const id = req.params.id;
  Feedback.remove({ _id: id }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("error occurred");
    } else {
      res.status(200).json({ msg: "successfully deleted" });
    }
  });
};

exports.put_feedback = (req, res) => {
  const username = req.body.username;
  const coursename = req.body.coursename;
  const rating = req.body.rating;
  const id = req.params.id;
  Feedback.update(
    { _id: id },
    {
      $set: {
        username: username,
        coursename: coursename,
        rating: rating,
      },
    }
  )
    .then((result) => {
      // console.log(result);
      res.status(200).json({ msg: "Successfullt updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error Occurred" });
    });
};
exports.put_feedback_edit = (req, res) => {
  console.log("I am a put, edit and update row");
  const username = req.body.username;
  const coursename = req.body.coursename;
  const rating = req.body.rating;
  const comments = req.body.comments;
  const id = req.params.id;
  Feedback.updateOne(
    { _id: id },
    {
      $set: {
        username: username,
        coursename: coursename,
        rating: rating,
        comments: comments,
      },
    }
  )
    .then((result) => {
      // console.log(result);
      // console.log("am being updated");
      res.status(200).json({ msg: "Successfullt updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error Occurred" });
    });
};
