import { Request, Response } from "express";

export const getAllHotels = async (req: Request, res: Response) => {
  res.json([{ id: 1, name: "Sample Hotel", location: "Durban" }]);
};

export const getAllBookings = async (req: Request, res: Response) => {
  res.json([{ id: 1, guest: "John Doe", hotel: "Sample Hotel" }]);
};

export const deleteHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Hotel ${id} deleted successfully.` });
};
