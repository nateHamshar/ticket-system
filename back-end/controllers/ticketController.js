const Ticket = require('../models/ticketModel')
const mongoose = require('mongoose')


//get all tickets
const getTickets = async (req, res) => {
    const companyCode = req.user.companyCode;

    const tickets = await Ticket.find({ companyCode }).sort({createdAt: -1})

    res.status(200).json({tickets})
    
}
//get a single ticket
const getTicket = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'not a valid id'})
    }

    const ticket = await Ticket.findById(id)

    if (!ticket) {
        return res.status(404).json({error: 'no ticket found'})
    }

    res.status(200).json({ticket})
}

//create a new ticket
const createTicket = async (req, res) => {
    const {title, location, description, open, companyCode} = req.body;

    //try to add ticket to db
    try {
        const ticket = await Ticket.create({title, location, description, open, companyCode})
        res.status(200).json(ticket)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a single ticket
const deleteTicket = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'not a valid id'})
    }

    const ticket = await Ticket.findOneAndDelete({_id: id})

    if (!ticket) {
        return res.status(404).json({error: 'no ticket found'})
    }

    res.status(200).json({ticket})
}
//update a single ticket
const updateTicket = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'not a valid id'})
    }

    const ticket = await Ticket.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!ticket) {
        return res.status(404).json({error: 'no ticket found'})
    }

    res.status(200).json({ticket})
}



//exports
module.exports = {
    createTicket,
    getTickets,
    getTicket,
    deleteTicket,
    updateTicket
}