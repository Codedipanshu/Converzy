const TextAreaBox = ({ label, text, setText, setLastUpdated }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold mb-1">{label}</label>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          label === "English" ? setLastUpdated("en") : setLastUpdated("hi");
        }}
        className="border rounded p-2 w-full h-32"
      />
    </div>
  );
};

export default TextAreaBox;
