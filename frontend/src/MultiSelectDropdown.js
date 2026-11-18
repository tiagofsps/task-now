import React, {useState, useRef, useEffect} from "react";
import Form from "react-bootstrap/Form";

function MultiSelectDropdown({options, selectedValues, onChange, label, style}) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // Fecha dropdown se clicares fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const toggleOption = (value) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const selectedLabels = options
        .filter((opt) => selectedValues.includes(opt.value))
        .map((opt) => opt.label);

    return (
        <div ref={ref} style={{position: "relative"}}>
            <Form.Control
                readOnly
                onClick={() => setOpen(!open)}
                value={selectedLabels.length > 0 ? selectedLabels.join(", ") : `Seleciona ${label}`}
                placeholder={`Seleciona ${label}`}
                className="multiselect-control"
                style={{cursor: "pointer", userSelect: "none"}}
            />
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        border: "1px solid #ced4da",
                        borderRadius: ".25rem",
                        backgroundColor: "white",
                        zIndex: 1000,
                        maxHeight: 150,
                        overflowY: "auto",
                        marginTop: 2,
                    }}
                >
                    {options.map(({value, label}) => (
                        <div
                            key={value}
                            style={{
                                padding: "0.25rem 0.75rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                            onClick={() => toggleOption(value)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(value)}
                                onChange={() => toggleOption(value)}
                                style={{marginRight: 8}}
                            />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiSelectDropdown;