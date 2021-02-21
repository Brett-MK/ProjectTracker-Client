import { Editor } from "@tinymce/tinymce-react";

export const TinyMceEditor = ({
  value,
  onEditorChange,
}: {
  value: string;
  onEditorChange: any;
}) => {
  return (
    <Editor
      apiKey={process.env.REACT_APP_TINYMCEKEY}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
      }}
      value={value}
      onEditorChange={(e) => onEditorChange(e)}
    />
  );
};
