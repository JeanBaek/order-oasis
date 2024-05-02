import { Button, Checkbox, Modal, Label } from "flowbite-react";
import { MouseEvent, useEffect, useState } from "react";
import { arrayToObject, objectToArray } from "../helper/dataStructure";

export type Props = {
  isOpen: boolean;
  title: string;
  option: Array<
    Field & {
      [key: string]: any;
    }
  >;
  submitDesc: string;
  disableOnUnchanged?: boolean;
  submit: (option?: Props["option"]) => void;
  close: () => void;
};

type Field = { id: string; checked: boolean; name: string; desc: string };
type FormData = Record<string, Field>;

export default function SelectModal(props: Props) {
  const {
    isOpen,
    title,
    option,
    submitDesc,
    disableOnUnchanged,
    submit,
    close,
  } = props;
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    setFormData(arrayToObject(option, (item) => item.id));
  }, [props]);

  function handleChange(event: MouseEvent) {
    const { id } = event.currentTarget as HTMLButtonElement;

    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id].checked },
    }));
  }

  function isFormChanged() {
    return objectToArray(formData).some((field) => {
      return field.checked !== option.find((o) => o.id === field.id)?.checked;
    });
  }

  function handleSubmit(event: MouseEvent) {
    event.preventDefault();
    submit(objectToArray(formData));
  }

  return (
    <Modal
      dismissible
      show={isOpen}
      onClose={close}
      size="sm"
      className="bg-gray-500 bg-opacity-40 ring-0 focus:ring-0"
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4 h-[300px]">
          {objectToArray(formData).map((o) => (
            <button
              id={o.id}
              key={title + o.id}
              className="flex items-center gap-2"
              onClick={handleChange}
            >
              <Checkbox
                id={o.id}
                checked={o.checked}
                className="h-6 w-6 focus:ring-0 cursor-pointer"
                color="blue"
                readOnly
              />
              <Label
                htmlFor={o.id}
                className="flex flex-1 justify-between cursor-pointer"
              >
                <span>{o.name}</span>
                <em className="text-gray-400">{o.desc}</em>
              </Label>
            </button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="p-0">
        <Button
          onClick={handleSubmit}
          disabled={disableOnUnchanged ? !isFormChanged() : false}
          fullSized={true}
          size="lg"
          className="p-2 text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-0 rounded-t-none disabled:pointer-events-none"
        >
          {submitDesc}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
