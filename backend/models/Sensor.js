import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required : true,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
    methane: {
      type: Number,
    },
    propane: {
      type: Number,
    },
    isobutane: {
      type: Number,
    },
    hydrogen: {
      type: Number,
    },
    // userUploader: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required : true,
    // },
  },

  { timestamps: true }
);

const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;
