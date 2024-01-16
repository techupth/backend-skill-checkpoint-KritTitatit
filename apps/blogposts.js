import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const blogpostRounter = Router();

/* *ดูข้อมูลทั้หงหมด* */
blogpostRounter.get("/", async (req, res) => {
  try {
    const collection = db.collection("blogposts");
    const blogposts = await collection.find({}).toArray();

    return res.json({
      message: "Fetching Sucessfully",
      data: blogposts,
    });
  } catch (error) {
    return res.json({
      message: `$(error)`,
    });
  }
});

/* *สร้างคำถามได้* */
blogpostRounter.post("/", async (req, res) => {
  try {
    const collection = db.collection("blogposts");
    const postData = { ...req.body };
    const blogposts = await collection.insertOne(postData);

    return res.json({
      message: `Blogpost created successfully`,
      data: blogposts,
    });
  } catch (error) {
    return res.json({
      message: `$(error)`,
    });
  }
});

/* *ดูคำถามแต่ละอันด้วย ID* */
blogpostRounter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("blogposts");
    const postId = new ObjectId(req.params.id);
    const postById = await collection.findOne({ _id: postId });

    return res.json({
      message: `Enter blogpost id:${postId} successfully`,
      data: postById,
    });
  } catch (error) {
    return res.json({
      message: `$(error)`,
    });
  }
});

/* *ผู้ใช้งานสามารถแก้ไข หัวข้อหรือคำอธิบายได้* */
blogpostRounter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("blogposts");
    const postId = new ObjectId(req.params.id);
    const newPostData = { ...req.body };

    await collection.updateOne({ _id: postId }, { $set: newPostData });

    return res.json({
      message: `Blogpost id:${postId} updated successfully`,
    });
  } catch (error) {
    return res.json({
      message: `$(error)`,
    });
  }
});

/* *ผู้ใช้งานสามารถที่จะลบคำถามได้* */
blogpostRounter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("blogposts");
    const postId = new ObjectId(req.params.id);
    await collection.deleteOne({
      _id: postId,
    });

    return res.json({
      message: `Blogpost id:${postId} deleted successfully`,
    });
  } catch (error) {
    return res.json({
      message: `$(error)`,
    });
  }
});

export default blogpostRounter;
