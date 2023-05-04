import "../cssfile/Filldata.css";
import "../cssfile/ScrollBar.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectValues from "../components/SelectValues";
import Loading from "../components/Loading";
import ShowResult from "../components/ShowResult";
import ErrorMessage from "../components/Error";
import axios from "axios";
import Header from "../components/Header";

const FillData = () => {
  const arr = [
    "abdominal_pain",
    "abnormal_menstruation",
    "acidity",
    "acute_liver_failure",
    "altered_sensorium",
    "anxiety",
    "back_pain",
    "belly_pain",
    "blackheads",
    "bladder_discomfort",
    "blister",
    "blood_in_sputum",
    "bloody_stool",
    "blurred_and_distorted_vision",
    "breathlessness",
    "brittle_nails",
    "bruising",
    "burning_micturition",
    "chest_pain",
    "chills",
    "cold_hands_and_feets",
    "coma",
    "congestion",
    "constipation",
    "continuous_feel_of_urine",
    "continuous_sneezing",
    "cough",
    "cramps",
    "dark_urine",
    "dehydration",
    "depression",
    "diarrhoea",
    "dischromic_patches",
    "distention_of_abdomen",
    "dizziness",
    "drying_and_tingling_lips",
    "enlarged_thyroid",
    "excessive_hunger",
    "extra_marital_contacts",
    "family_history",
    "fast_heart_rate",
    "fatigue",
    "fluid_overload",
    "fluid_overload",
    "foul_smell_of_urine",
    "headache",
    "high_fever",
    "hip_joint_pain",
    "history_of_alcohol_consumption",
    "increased_appetite",
    "indigestion",
    "inflammatory_nails",
    "internal_itching",
    "irregular_sugar_level",
    "irritability",
    "irritation_in_anus",
    "itching",
    "joint_pain",
    "knee_pain",
    "lack_of_concentration",
    "lethargy",
    "loss_of_appetite",
    "loss_of_balance",
    "loss_of_smell",
    "malaise",
    "mild_fever",
    "mood_swings",
    "movement_stiffness",
    "mucoid_sputum",
    "muscle_pain",
    "muscle_wasting",
    "muscle_weakness",
    "nausea",
    "neck_pain",
    "nodal_skin_eruptions",
    "obesity",
    "pain_behind_the_eyes",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "painful_walking",
    "palpitations",
    "passage_of_gases",
    "patches_in_throat",
    "phlegm",
    "polyuria",
    "prominent_veins_on_calf",
    "puffy_face_and_eyes",
    "pus_filled_pimples",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "red_sore_around_nose",
    "red_spots_over_body",
    "redness_of_eyes",
    "restlessness",
    "runny_nose",
    "rusty_sputum",
    "scurring",
    "shivering",
    "silver_like_dusting",
    "sinus_pressure",
    "skin_peeling",
    "skin_rash",
    "slurred_speech",
    "small_dents_in_nails",
    "spinning_movements",
    "spotting_urination",
    "stiff_neck",
    "stomach_bleeding",
    "stomach_pain",
    "sunken_eyes",
    "sweating",
    "swelled_lymph_nodes",
    "swelling_joints",
    "swelling_of_stomach",
    "swollen_blood_vessels",
    "swollen_extremeties",
    "swollen_legs",
    "throat_irritation",
    "toxic_look_typhos",
    "ulcers_on_tongue",
    "unsteadiness",
    "visual_disturbances",
    "vomiting",
    "watering_from_eyes",
    "weakness_in_limbs",
    "weakness_of_one_body_side",
    "weight_gain",
    "weight_loss",
    "yellow_crust_ooze",
    "yellow_urine",
    "yellowing_of_eyes",
    "yellowish_skin",
  ];
  const [objectValues, setValues] = useState({
    abdominal_pain: 0,
    abnormal_menstruation: 0,
    acidity: 0,
    acute_liver_failure: 0,
    altered_sensorium: 0,
    anxiety: 0,
    back_pain: 0,
    belly_pain: 0,
    blackheads: 0,
    bladder_discomfort: 0,
    blister: 0,
    blood_in_sputum: 0,
    bloody_stool: 0,
    blurred_and_distorted_vision: 0,
    breathlessness: 0,
    brittle_nails: 0,
    bruising: 0,
    burning_micturition: 0,
    chest_pain: 0,
    chills: 0,
    cold_hands_and_feets: 0,
    coma: 0,
    congestion: 0,
    constipation: 0,
    continuous_feel_of_urine: 0,
    continuous_sneezing: 0,
    cough: 0,
    cramps: 0,
    dark_urine: 0,
    dehydration: 0,
    depression: 0,
    diarrhoea: 0,
    dischromic_patches: 0,
    distention_of_abdomen: 0,
    dizziness: 0,
    drying_and_tingling_lips: 0,
    enlarged_thyroid: 0,
    excessive_hunger: 0,
    extra_marital_contacts: 0,
    family_history: 0,
    fast_heart_rate: 0,
    fatigue: 0,
    fluid_overload: 0,
    fluid_overload: 0,
    foul_smell_of_urine: 0,
    headache: 0,
    high_fever: 0,
    hip_joint_pain: 0,
    history_of_alcohol_consumption: 0,
    increased_appetite: 0,
    indigestion: 0,
    inflammatory_nails: 0,
    internal_itching: 0,
    irregular_sugar_level: 0,
    irritability: 0,
    irritation_in_anus: 0,
    itching: 0,
    joint_pain: 0,
    knee_pain: 0,
    lack_of_concentration: 0,
    lethargy: 0,
    loss_of_appetite: 0,
    loss_of_balance: 0,
    loss_of_smell: 0,
    malaise: 0,
    mild_fever: 0,
    mood_swings: 0,
    movement_stiffness: 0,
    mucoid_sputum: 0,
    muscle_pain: 0,
    muscle_wasting: 0,
    muscle_weakness: 0,
    nausea: 0,
    neck_pain: 0,
    nodal_skin_eruptions: 0,
    obesity: 0,
    pain_behind_the_eyes: 0,
    pain_during_bowel_movements: 0,
    pain_in_anal_region: 0,
    painful_walking: 0,
    palpitations: 0,
    passage_of_gases: 0,
    patches_in_throat: 0,
    phlegm: 0,
    polyuria: 0,
    prominent_veins_on_calf: 0,
    puffy_face_and_eyes: 0,
    pus_filled_pimples: 0,
    receiving_blood_transfusion: 0,
    receiving_unsterile_injections: 0,
    red_sore_around_nose: 0,
    red_spots_over_body: 0,
    redness_of_eyes: 0,
    restlessness: 0,
    runny_nose: 0,
    rusty_sputum: 0,
    scurring: 0,
    shivering: 0,
    silver_like_dusting: 0,
    sinus_pressure: 0,
    skin_peeling: 0,
    skin_rash: 0,
    slurred_speech: 0,
    small_dents_in_nails: 0,
    spinning_movements: 0,
    spotting_urination: 0,
    stiff_neck: 0,
    stomach_bleeding: 0,
    stomach_pain: 0,
    sunken_eyes: 0,
    sweating: 0,
    swelled_lymph_nodes: 0,
    swelling_joints: 0,
    swelling_of_stomach: 0,
    swollen_blood_vessels: 0,
    swollen_extremeties: 0,
    swollen_legs: 0,
    throat_irritation: 0,
    toxic_look_typhos: 0,
    ulcers_on_tongue: 0,
    unsteadiness: 0,
    visual_disturbances: 0,
    vomiting: 0,
    watering_from_eyes: 0,
    weakness_in_limbs: 0,
    weakness_of_one_body_side: 0,
    weight_gain: 0,
    weight_loss: 0,
    yellow_crust_ooze: 0,
    yellow_urine: 0,
    yellowing_of_eyes: 0,
    yellowish_skin: 0,
  });
  const [result, setresult] = useState("");
  const [showdata, setshowdata] = useState(true);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserLogin = useSelector((state) => state.userLogin);
  const { userInfo } = UserLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async () => {
    try {
      seterror("");
      setloading(true);
      setshowdata(false);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user/seeresult",
        { objectValues },
        config
      );
      setloading(false);
      setresult(data.data);
      setshowdata(true);
    } catch (err) {
      console.log(err);
      seterror(err);
      setshowdata(false);
      setloading(false);
    }
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Header setSearchValue={setSearchValue} />
      {result && <ShowResult result={result} setresult={setresult} />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!result && showdata && <span style={{ color: "red" }}>* </span>}
      {!result && showdata && (
        <span style={{ fontWeight: "bold", fontSize: "3vh" }}>
          All the values are present in ascending order
        </span>
      )}
      {loading && <Loading />}
      {!result &&
        showdata &&
        arr
          .filter((value) => {
            return value.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((name, index) => (
            <SelectValues
              key={index}
              name={name}
              objectValues={objectValues}
              setValues={setValues}
            />
          ))}
      {!result && showdata && (
        <div className="Resultdiv" onClick={submitHandler}>
          <Button style={{ fontSize: "3vh" }}>Find Result</Button>
        </div>
      )}
    </>
  );
};

export default FillData;
