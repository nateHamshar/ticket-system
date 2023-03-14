const express = require("express")
const {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
} = require('../controllers/ticketController')
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

router.use(requireAuth)

router.get("/", getTickets)
router.get("/:id", getTicket)
router.post("/", createTicket)
router.delete("/:id", deleteTicket)
router.patch("/:id", updateTicket)

module.exports = router;