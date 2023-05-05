const fs = require("fs");
const { spawn } = require("child_process");

const User = require("../Model/usermodel");
const nodemailer = require("nodemailer");
const otp = require("otp-generator");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");

const registeruser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const Email = email.toLowerCase();
  const ifExist = await User.findOne({
    email: Email,
  });
  if (ifExist) {
    res.status(400);
    throw new Error("This account is already registered");
  }
  const user = await User.create({
    name: name,
    email: Email,
    password: password,
    pic: pic,
  });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something Wrong");
  }
});

const authUser = asyncHandler(async (req, res) => {
  var { email, password } = req.body;
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Email or Password Wrong");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.email) {
      const Email = req.body.email.toLowerCase();
      const ifExist = await User.findOne({ email: Email });
      if (ifExist) {
        if (ifExist._id.toString() !== req.user._id.toString()) {
          res.status(400);
          throw new Error("This email is already registered");
        }
      }
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email.toLowerCase() || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const UpdatedUser = await user.save();
    console.log(user.email);
    res.json({
      _id: UpdatedUser._id,
      name: UpdatedUser.name,
      email: UpdatedUser.email,
      pic: UpdatedUser.pic,
      token: generateToken(UpdatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const verifyotp = asyncHandler(async (req, res) => {
  var { email } = req.body;
  email = email.toLowerCase();
  console.log(email);
  const UserExist = await User.findOne({ email });
  if (UserExist) {
    console.log("1");
    const otpvalue = otp.generate();
    async function main() {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: process.env.email,
          pass: process.env.smtpkey,
        },
      });

      let info = await transporter.sendMail({
        from: '"OTP 👻" Disease_Prediction@gmail.com', // sender address
        to: String(email), // list of receivers
        subject: "Hello ✔",
        text: otpvalue,
      });
    }
    main()
      .then(() => {
        console.log(otpvalue);
        res.json({ otp: otpvalue });
      })
      .catch((err) => {
        res.status(404);
        throw new Error(err);
      });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const verifyotpregister = asyncHandler(async (req, res) => {
  var { email } = req.body;
  email = email.toLowerCase();
  console.log(email);
  const UserExist = await User.findOne({ email });
  if (!UserExist) {
    console.log("1");
    const otpvalue = otp.generate();
    async function main() {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: process.env.email,
          pass: process.env.smtpkey,
        },
      });

      let info = await transporter.sendMail({
        from: '"OTP 👻" Disease_Prediction@gmail.com', // sender address
        to: String(email), // list of receivers
        subject: "Hello ✔",
        text: otpvalue,
      });
      // console.log(otpvalue);
    }
    main()
      .then(() => {
        res.json({ otp: otpvalue });
      })
      .catch((err) => {
        res.status(404);
        throw new Error(err);
      });
  } else {
    res.status(404);
    throw new Error("User Already Have Account...");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Provide full data");
  } else {
    email = email.toLowerCase();
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      UserExist.password = password;
      const user = await UserExist.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      });
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
  }
});

const seeresult = (req, res) => {
  try {
    fs.writeFileSync(
      "Testing.csv",
      "itching,skin_rash,nodal_skin_eruptions,continuous_sneezing,shivering,chills,joint_pain,stomach_pain,acidity,ulcers_on_tongue,muscle_wasting,vomiting,burning_micturition,spotting_ urination,fatigue,weight_gain,anxiety,cold_hands_and_feets,mood_swings,weight_loss,restlessness,lethargy,patches_in_throat,irregular_sugar_level,cough,high_fever,sunken_eyes,breathlessness,sweating,dehydration,indigestion,headache,yellowish_skin,dark_urine,nausea,loss_of_appetite,pain_behind_the_eyes,back_pain,constipation,abdominal_pain,diarrhoea,mild_fever,yellow_urine,yellowing_of_eyes,acute_liver_failure,fluid_overload,swelling_of_stomach,swelled_lymph_nodes,malaise,blurred_and_distorted_vision,phlegm,throat_irritation,redness_of_eyes,sinus_pressure,runny_nose,congestion,chest_pain,weakness_in_limbs,fast_heart_rate,pain_during_bowel_movements,pain_in_anal_region,bloody_stool,irritation_in_anus,neck_pain,dizziness,cramps,bruising,obesity,swollen_legs,swollen_blood_vessels,puffy_face_and_eyes,enlarged_thyroid,brittle_nails,swollen_extremeties,excessive_hunger,extra_marital_contacts,drying_and_tingling_lips,slurred_speech,knee_pain,hip_joint_pain,muscle_weakness,stiff_neck,swelling_joints,movement_stiffness,spinning_movements,loss_of_balance,unsteadiness,weakness_of_one_body_side,loss_of_smell,bladder_discomfort,foul_smell_of urine,continuous_feel_of_urine,passage_of_gases,internal_itching,toxic_look_(typhos),depression,irritability,muscle_pain,altered_sensorium,red_spots_over_body,belly_pain,abnormal_menstruation,dischromic _patches,watering_from_eyes,increased_appetite,polyuria,family_history,mucoid_sputum,rusty_sputum,lack_of_concentration,visual_disturbances,receiving_blood_transfusion,receiving_unsterile_injections,coma,stomach_bleeding,distention_of_abdomen,history_of_alcohol_consumption,fluid_overload,blood_in_sputum,prominent_veins_on_calf,palpitations,painful_walking,pus_filled_pimples,blackheads,scurring,skin_peeling,silver_like_dusting,small_dents_in_nails,inflammatory_nails,blister,red_sore_around_nose,yellow_crust_ooze"
    );
    console.log("hellw2");
    fs.appendFileSync("Testing.csv", "\n");
    const arr = [
      "itching",
      "skin_rash",
      "nodal_skin_eruptions",
      "continuous_sneezing",
      "shivering",
      "chills",
      "joint_pain",
      "stomach_pain",
      "acidity",
      "ulcers_on_tongue",
      "muscle_wasting",
      "vomiting",
      "burning_micturition",
      "spotting_urination",
      "fatigue",
      "weight_gain",
      "anxiety",
      "cold_hands_and_feets",
      "mood_swings",
      "weight_loss",
      "restlessness",
      "lethargy",
      "patches_in_throat",
      "irregular_sugar_level",
      "cough",
      "high_fever",
      "sunken_eyes",
      "breathlessness",
      "sweating",
      "dehydration",
      "indigestion",
      "headache",
      "yellowish_skin",
      "dark_urine",
      "nausea",
      "loss_of_appetite",
      "pain_behind_the_eyes",
      "back_pain",
      "constipation",
      "abdominal_pain",
      "diarrhoea",
      "mild_fever",
      "yellow_urine",
      "yellowing_of_eyes",
      "acute_liver_failure",
      "fluid_overload",
      "swelling_of_stomach",
      "swelled_lymph_nodes",
      "malaise",
      "blurred_and_distorted_vision",
      "phlegm",
      "throat_irritation",
      "redness_of_eyes",
      "sinus_pressure",
      "runny_nose",
      "congestion",
      "chest_pain",
      "weakness_in_limbs",
      "fast_heart_rate",
      "pain_during_bowel_movements",
      "pain_in_anal_region",
      "bloody_stool",
      "irritation_in_anus",
      "neck_pain",
      "dizziness",
      "cramps",
      "bruising",
      "obesity",
      "swollen_legs",
      "swollen_blood_vessels",
      "puffy_face_and_eyes",
      "enlarged_thyroid",
      "brittle_nails",
      "swollen_extremeties",
      "excessive_hunger",
      "extra_marital_contacts",
      "drying_and_tingling_lips",
      "slurred_speech",
      "knee_pain",
      "hip_joint_pain",
      "muscle_weakness",
      "stiff_neck",
      "swelling_joints",
      "movement_stiffness",
      "spinning_movements",
      "loss_of_balance",
      "unsteadiness",
      "weakness_of_one_body_side",
      "loss_of_smell",
      "bladder_discomfort",
      "foul_smell_of_urine",
      "continuous_feel_of_urine",
      "passage_of_gases",
      "internal_itching",
      "toxic_look_typhos",
      "depression",
      "irritability",
      "muscle_pain",
      "altered_sensorium",
      "red_spots_over_body",
      "belly_pain",
      "abnormal_menstruation",
      "dischromic_patches",
      "watering_from_eyes",
      "increased_appetite",
      "polyuria",
      "family_history",
      "mucoid_sputum",
      "rusty_sputum",
      "lack_of_concentration",
      "visual_disturbances",
      "receiving_blood_transfusion",
      "receiving_unsterile_injections",
      "coma",
      "stomach_bleeding",
      "distention_of_abdomen",
      "history_of_alcohol_consumption",
      "fluid_overload",
      "blood_in_sputum",
      "prominent_veins_on_calf",
      "palpitations",
      "painful_walking",
      "pus_filled_pimples",
      "blackheads",
      "scurring",
      "skin_peeling",
      "silver_like_dusting",
      "small_dents_in_nails",
      "inflammatory_nails",
      "blister",
      "red_sore_around_nose",
      "yellow_crust_ooze",
    ];
    for (var i = 0; i < arr.length; i++) {
      fs.appendFileSync(
        "Testing.csv",
        req.body.objectValues[arr[i]].toString()
      );
      if (i + 1 !== arr.length) {
        fs.appendFileSync("Testing.csv", ",");
      }
      console.log(i);
    }
    const childPython = spawn("python", ["project.py"]);
    childPython.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      res.json({ data: `${data}` });
    });

    childPython.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
      throw new Error(data);
    });
    childPython.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      // throw new Error(code);
    });

    // res.json({ data: "file created" });
  } catch (err) {
    res.status(404);
    throw new Error(err);
  }
};

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .select("-password")
    .find({ _id: { $ne: req.user._id } });
  res.json(users);
});

module.exports = {
  registeruser,
  authUser,
  updateUserProfile,
  verifyotp,
  seeresult,
  changePassword,
  verifyotpregister,
  allUsers,
};
