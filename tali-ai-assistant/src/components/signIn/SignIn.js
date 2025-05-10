import "./SignIn.css";
import React, { useContext, useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { Timestamp } from "firebase/firestore";


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { GlobalContext } from "../../context/GlobalContext";

export default function SignIn() {
  const [accState, setAccState] = useState("Sign-in");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);
  const formDatas = new FormData(formRef.current);
  const { email, password, username } = Object.fromEntries(formDatas.entries());

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: username, // 🔹 Store the username here
      email,
      createdAt: Timestamp.now(),
      // User data
      assessmentCredits: 4,
      wordsPracticed: 0,
      sentencesAnalyzed: 0,
      minutesOfFeedback: 0,
      correctPronunciationRate: 0,
      exercisesCompleted: 0,
      customWordsTrained: 0,
      feedbackSessions: 0,
      audioUploads: 0,

      // Data for pronunciation and fluency tracking
      pronunciationAccuracyData: [
        { day: "Mon", accuracy: 0 },
        { day: "Tue", accuracy: 0 },
        { day: "Wed", accuracy: 0 },
        { day: "Thu", accuracy: 0 },
        { day: "Fri", accuracy: 0 },
        { day: "Sat", accuracy: 0 },
        { day: "Sun", accuracy: 0 },
      ],

      fluencyData: [
        { day: "Mon", fluency: 0 },
        { day: "Tue", fluency: 0 },
        { day: "Wed", fluency: 0 },
        { day: "Thu", fluency: 0 },
        { day: "Fri", fluency: 0 },
        { day: "Sat", fluency: 0 },
        { day: "Sun", fluency: 0 },
      ],

      speechErrorData: [
        { type: "Mispronunciation", count: 0 },
        { type: "Omission", count: 0 },
        { type: "Insertion", count: 0 },
        { type: "Intonation", count: 0 },
      ],
    });

    setShow(false);
    toast.success("Account created successfully");
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast.success("User logged Out!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formDatas = new FormData(formRef.current);
    const { email, password } = Object.fromEntries(formDatas.entries());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("User Logged in!");
      setShow(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="row">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton
      />

      <Button
        variant="primary"
        onClick={currentUser ? handleLogOut : handleShow}
        className="fw-bold px-4  watch-video"
      >
        {currentUser
          ? "SignOut"
          : accState === "Sign-in"
            ? "Sign In"
            : "Sign Up"}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="custom-modal"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="modal-change border-0">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="fw-bold color-fix"
          >
            {accState} to Tali
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-change border-0">
          <Form ref={formRef}>
            {accState === "Sign-up" && (
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold color-fix">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  className="color-fix"
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold color-fix">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="color-fix"
                name="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold color-fix">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                className="color-fix"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 d-flex modal-change justify-content-center">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="fw-bold me-2"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={accState === "Sign-up" ? handleSignUp : handleLogIn}
            disabled={loading}
            className="fw-bold"
          >
            {loading
              ? "Loading . . ."
              : accState === "Sign-up"
                ? "Create Account"
                : "Sign in"}
          </Button>
        </Modal.Footer>

        <div className="text-center p-3 fw-semibold modal-change color-fix">
          {accState === "Sign-up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-primary"
                onClick={() => setAccState("Sign-in")}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="text-primary"
                onClick={() => setAccState("Sign-up")}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
