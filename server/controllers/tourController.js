import Tour from "../models/Tour.js";

async function getNextId() {
  const lastTour = await Tour.findOne().sort({ id: -1 });
  return lastTour ? lastTour.id + 1 : 1;
}

export async function getTours(req, res) {
  try {
    const { region, category, q } = req.query;
    const query = {};
    if (region) query.region = region;
    if (category) query.category = category;
    if (q) {
      const needle = new RegExp(q, "i");
      query.$or = [{ title: needle }, { destination: needle }];
    }
    const tours = await Tour.find(query).sort({ id: 1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTourBySlug(req, res) {
  try {
    const { slug } = req.params;
    const tour = await Tour.findOne({ slug });
    if (!tour) return res.status(404).json({ message: "Không tìm thấy tour." });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTour(req, res) {
  try {
    const id = await getNextId();
    const tour = await Tour.create({
      ...req.body,
      id,
      rating: 0,
      reviewCount: 0,
    });
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateTour(req, res) {
  try {
    const id = Number(req.params.id);
    const tour = await Tour.findOneAndUpdate({ id }, req.body, { new: true });
    if (!tour) return res.status(404).json({ message: "Không tìm thấy tour." });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteTour(req, res) {
  try {
    const id = Number(req.params.id);
    await Tour.findOneAndDelete({ id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
