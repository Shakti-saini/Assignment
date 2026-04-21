import { useState } from "react";
import { sendEmailAPI } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./email.css";

const SendEmail = () => {
  const [form, setForm] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // file change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    for (let file of selectedFiles) {
      if (file.size > 5 * 1024) {
        toast.error(`❌ ${file.name} size must be less than 5KB`);
        return;
      }
    }

    setFiles(selectedFiles);
  };

  // email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // validation
  const validateForm = () => {
    if (!form.to) {
      toast.error("Recipient (TO) is required");
      return false;
    }

    const emails = form.to.split(",");
    for (let email of emails) {
      if (!isValidEmail(email.trim())) {
        toast.error(`Invalid email: ${email}`);
        return false;
      }
    }

    if (form.cc) {
      const ccEmails = form.cc.split(",");
      for (let email of ccEmails) {
        if (!isValidEmail(email.trim())) {
          toast.error(`Invalid CC email: ${email}`);
          return false;
        }
      }
    }

    if (form.subject.trim() === "") {
      toast.error("Subject is required");
      return false;
    }

    if (form.body.trim() === "") {
      toast.error("Message body is required");
      return false;
    }

    return true;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    files.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const res = await sendEmailAPI(formData);
      toast.success(res.message || "Email sent successfully ✅");

      setForm({
        to: "",
        cc: "",
        bcc: "",
        subject: "",
        body: "",
      });
      setFiles([]);

    } catch (err) {
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Email Sender</h2>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          name="to"
          placeholder="To (comma separated)"
          value={form.to}
          onChange={handleChange}
        />

        <input
          type="text"
          name="cc"
          placeholder="CC"
          value={form.cc}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bcc"
          placeholder="BCC"
          value={form.bcc}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        <textarea
          name="body"
          placeholder="Message"
          value={form.body}
          onChange={handleChange}
          rows={5}
        />

        <input type="file" multiple onChange={handleFileChange} />

        {files.length > 0 && (
          <ul className="file-list">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>

      </form>
    </div>
  );
};

export default SendEmail;