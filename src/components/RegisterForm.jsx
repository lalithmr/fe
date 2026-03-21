import { useState } from "react";
import { createRegistration } from "../services/api";

const initialValues = {
  studentName: "",
  age: "",
  parentName: "",
  phoneNumber: "",
  email: "",
  experienceLevel: "",
  batch: "",
  hasChessSet: "",
  needsPremiumChessSet: "No",
};

function validate(values) {
  const errors = {};

  if (!values.studentName.trim()) {
    errors.studentName = "Student name is required.";
  }

  if (!values.age.trim()) {
    errors.age = "Age is required.";
  } else {
    const age = Number(values.age);
    if (!Number.isInteger(age) || age < 6 || age > 20) {
      errors.age = "Age must be between 6 and 20.";
    }
  }

  if (!values.parentName.trim()) {
    errors.parentName = "Parent name is required.";
  }

  if (!/^\d{10}$/.test(values.phoneNumber.trim())) {
    errors.phoneNumber = "Enter a valid 10-digit phone number.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.experienceLevel) {
    errors.experienceLevel = "Please select an experience level.";
  }

  if (!values.batch) {
    errors.batch = "Please select a batch.";
  }

  if (!values.hasChessSet) {
    errors.hasChessSet = "Please select an option.";
  }

  if (values.hasChessSet === "No" && !values.needsPremiumChessSet) {
    errors.needsPremiumChessSet = "Please select an option.";
  }

  return errors;
}

function RegisterForm() {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value,
      ...(name === "hasChessSet" && value === "Yes"
        ? { needsPremiumChessSet: "No" }
        : name === "hasChessSet" && value === "No"
          ? { needsPremiumChessSet: "" }
          : {}),
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(formValues);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createRegistration({
        studentName: formValues.studentName.trim(),
        age: Number(formValues.age),
        parentName: formValues.parentName.trim(),
        phone: formValues.phoneNumber.trim(),
        email: formValues.email.trim(),
        level: formValues.experienceLevel,
        batch: formValues.batch,
        hasChessSet: formValues.hasChessSet,
        needsPremiumChessSet:
          formValues.hasChessSet === "No"
            ? formValues.needsPremiumChessSet
            : "No",
      });

      setFormValues(initialValues);
      setShowSuccess(true);
    } catch (error) {
      setSubmitError(error.message || "Unable to submit the form right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section id="register" className="section section--alt">
        <div className="register-layout">
          <div className="section__header register-intro fade-up">
            <span className="section-kicker">Register</span>
            <h2>Reserve your child&apos;s seat for a summer of sharper thinking.</h2>
            <p>
              Fill out the form and our team will confirm batch details and the
              next enrollment steps.
            </p>
          </div>

          <form
            className="form-card fade-up fade-up--delay-2"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-grid">
              <label className="form-field">
                <span>Student Name</span>
                <input
                  name="studentName"
                  value={formValues.studentName}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.studentName)}
                />
                {errors.studentName ? <small>{errors.studentName}</small> : null}
              </label>

              <label className="form-field">
                <span>Age</span>
                <input
                  name="age"
                  type="number"
                  min="6"
                  max="20"
                  value={formValues.age}
                  onChange={handleChange}
                  placeholder="6 - 20"
                  inputMode="numeric"
                  required
                  aria-invalid={Boolean(errors.age)}
                />
                {errors.age ? <small>{errors.age}</small> : null}
              </label>

              <label className="form-field">
                <span>Parent Name</span>
                <input
                  name="parentName"
                  value={formValues.parentName}
                  onChange={handleChange}
                  placeholder="Enter parent name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.parentName)}
                />
                {errors.parentName ? <small>{errors.parentName}</small> : null}
              </label>

              <label className="form-field">
                <span>Phone Number</span>
                <input
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  required
                  aria-invalid={Boolean(errors.phoneNumber)}
                />
                {errors.phoneNumber ? <small>{errors.phoneNumber}</small> : null}
              </label>

              <label className="form-field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <small>{errors.email}</small> : null}
              </label>

              <label className="form-field">
                <span>Experience Level</span>
                <select
                  name="experienceLevel"
                  value={formValues.experienceLevel}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.experienceLevel)}
                >
                  <option value="">Select experience level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
                {errors.experienceLevel ? (
                  <small>{errors.experienceLevel}</small>
                ) : null}
              </label>

              <label className="form-field">
                <span>Batch</span>
                <select
                  name="batch"
                  value={formValues.batch}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.batch)}
                >
                  <option value="">Select batch</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </select>
                {errors.batch ? <small>{errors.batch}</small> : null}
              </label>

              <label className="form-field">
                <span>Do you have a chess set?</span>
                <select
                  name="hasChessSet"
                  value={formValues.hasChessSet}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.hasChessSet)}
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.hasChessSet ? <small>{errors.hasChessSet}</small> : null}
              </label>

              {formValues.hasChessSet === "No" ? (
                <label className="form-field">
                  <span>Do you need a premium chess set? [Charges applicable]</span>
                  <select
                    name="needsPremiumChessSet"
                    value={formValues.needsPremiumChessSet}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.needsPremiumChessSet)}
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.needsPremiumChessSet ? (
                    <small>{errors.needsPremiumChessSet}</small>
                  ) : null}
                </label>
              ) : null}
            </div>

            {submitError ? (
              <p className="form-error" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              className="hero__cta form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner-wrap">
                  <span className="spinner" aria-hidden="true" />
                  Submitting...
                </span>
              ) : (
                "Submit Registration"
              )}
            </button>
          </form>
        </div>
      </section>

      {showSuccess ? (
        <div className="popup" onClick={() => setShowSuccess(false)}>
          <div className="popup-card" onClick={(event) => event.stopPropagation()}>
            <span className="section-kicker">Success</span>
            <h3>Registration submitted successfully.</h3>
            <p role="status" aria-live="polite">
              Thank you for registering with ChessIQ. We&apos;ll contact you
              shortly with the next steps.
            </p>
            <button
              type="button"
              className="hero__cta popup-card__button"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RegisterForm;
