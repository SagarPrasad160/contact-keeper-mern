const express = require("express");

const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const Contact = require("../models/Contact");

const { check, validationResult } = require("express-validator");

//@route  GET /api/contacts
//@des get user contacts
// @access Private
router.get("/", requireAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.send(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
});

router.post(
  "/",
  requireAuth,
  [check("name", "Please provide a name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(400).send({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.send(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500), send({ msg: "Server Error" });
    }
  }
);

router.put("/:id", requireAuth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send({ msg: "Contact not found!" });
    }

    // check if contact does not belongs to user
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .send({ msg: "Not Authorized to update this resource" });
    }
    const { name, email, phone, type } = req.body;
    const updatedContact = {};
    if (name) updatedContact.name = name;
    if (email) updatedContact.email = email;
    if (phone) updatedContact.phone = phone;
    if (type) updatedContact.type = type;

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedContact,
      },
      { new: true }
    );
    res.send(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .send({ msg: "Not Authorized to delete this resource" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.send({ msg: "Contact removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

module.exports = router;
