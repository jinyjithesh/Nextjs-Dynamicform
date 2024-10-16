'use client';
import React, { useState } from 'react';

type FormDataType = {
    [key: string]: string | string[] | File | undefined;
};

const page = () => {
    const formSpec = {
        formElements: [
            {
                type: "text",
                id: "username",
                label: "Username",
                name: "username",
                placeholder: "Enter your username",
                required: true,
                validation: {
                    regex: "^[a-zA-Z0-9_]{5,20}$",
                    errorMessage: "Username must be 5-20 characters and contain only letters, numbers, and underscores."
                }
            },
            {
                type: "email",
                id: "email",
                label: "Email",
                name: "email",
                placeholder: "Enter your email",
                required: true,
                validation: {
                    regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                    errorMessage: "Please enter a valid email address."
                }
            },
            {
                type: "password",
                id: "password",
                label: "Password",
                name: "password",
                placeholder: "Enter your password",
                required: true,
                validation: {
                    regex: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                    errorMessage: "Password must be at least 8 characters long and include at least one letter and one number."
                }
            },
            {
                "type": "tel",
                "id": "phone",
                "label": "Phone Number",
                "name": "phone",
                "placeholder": "Enter your phone number",
                "required": true,
                "validation": {
                  "regex": "^\\+?[1-9]\\d{1,14}$",
                  "errorMessage": "Please enter a valid phone number (e.g., +123456789)."
                }
              },
            {
                type: 'checkbox',
                id: 'gender',
                label: 'Gender',
                name: 'gender',
                required: true,
                validation: {
                    regex: "",
                    errorMessage: 'Please select at least one gender.'
                  },
                options: [
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' }
                ]
            },
            {
                type: 'file',
                id: 'profileImage',
                label: 'Profile Image',
                name: 'profileImage',
                required: true
            }
        ]
    };

    const [formData, setFormData] = useState<FormDataType>({
        username: '',
        email: '',
        password: '',
        profileImage: undefined,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [allSubmissions, setAllSubmissions] = useState<FormDataType[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, files, checked } = e.target;

        setFormData((prevData) => {
            if (type === 'checkbox') {
                const existingValues = prevData[name] || [];
                return {
                    ...prevData,
                    [name]: checked
                        ? Array.isArray(existingValues) ? [...existingValues, value] : [value]
                        : Array.isArray(existingValues) ? existingValues.filter((item) => item !== value) : [],
                };
            } else if (type === 'file' && files) {
                return { ...prevData, [name]: files[0] };
            } else {
                return { ...prevData, [name]: value };
            }
        });
    };

    const validateField = (name: string, value: string, regex: string, errorMessage: string) => {
        const pattern = new RegExp(regex);
        if (!pattern.test(value)) {
            setErrors((prev) => ({ ...prev, [name]: errorMessage }));
        } else {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            setAllSubmissions((prev) => [...prev, formData]);
            setFormData({ username: '', email: '', password: '', profileImage: undefined });
        }
    };

    return (
   
          
            
            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
            {/* Left Column */}
            <div
              style={{
                flex: 1, 
                background: "#f0f0f0",
                textAlign: "center", 
                padding: "60px", 
                marginRight: "10px" 
              }}
            >
              <h2>Form</h2>
              <form style={{border:"2px",background:"pink",width:"300px",textAlign:"left",textAlignLast:'center'}}onSubmit={handleSubmit}>
                        {formSpec.formElements.map((element) => (
                            <div key={element.id} style={{padding:"20px"}}>
                                <label htmlFor={element.id} >
                                    {element.label}
                                </label><br/>
                                {element.type === 'file' ? (
                                    <input
                                    
                                        type="file"
                                        id={element.id}
                                        name={element.name}
                                        required={element.required}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                ) : element.type === 'checkbox' ? (
                                    element.options?.map(option => (
                                        <div key={option.value} className="flex items-center mb-2">
                                            <input
                                           
                                                type="checkbox"
                                                id={`${element.id}-${option.value}`}
                                                name={element.name}
                                                value={option.value}
                                                checked={Array.isArray(formData[element.name]) &&
                                                    (formData[element.name] as string[]).includes(option.value)}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        if (element.validation) {
                                                            validateField(
                                                                e.target.name,
                                                                e.target.value,
                                                                element.validation.regex,
                                                                element.validation.errorMessage
                                                            );
                                                        }
                                                    }}
                                                
                                            />
                                            <label htmlFor={`${element.id}-${option.value}`} className="text-gray-600">{option.label}</label>
                                        </div>
                                    ))
                                ) : (
                                    <input
                                    style={{width:"200px",height:"30px",borderRadius:"20px"}}
                                        type={element.type}
                                        id={element.id}
                                        name={element.name}
                                        placeholder={element.placeholder}
                                        required={element.required}
                                        value={typeof formData[element.name] === 'string' ? formData[element.name] as string : ''}
                                        onChange={(e) => {
                                            handleChange(e);
                                            if (element.validation) {
                                                validateField(
                                                    e.target.name,
                                                    e.target.value,
                                                    element.validation.regex,
                                                    element.validation.errorMessage
                                                );
                                            }
                                        }}
                                      
                                    />
                                )}
                                {errors[element.name] && (
                                    <span className="text-red-500 text-sm">{errors[element.name]}</span>
                                )}
                            </div>
                        ))}
                        <button type="submit" style={{color:"red"}}>
                            Submit
                        </button>
                    </form>
            </div>
      
        
            <div
              style={{
                flex: 3, 
                background: "#dcdcdc", 
                textAlign: "center",
                padding: "20px", 
                marginLeft: "10px" 
              }}
            >
              <h2>Form Data</h2>
              <div
      style={{
        flex:"1",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {allSubmissions.length > 0 && (
                        <div>
                           
                            {allSubmissions.map((submission, index) => (
                                <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow">
                                
                                    
                                        {Object.entries(submission).map(([key, value]) => (
                                            <a key={key}>
                                                <strong>{key}:</strong> {key === 'profileImage' ? 
                                                (value as File).name : Array.isArray(value) ? 
                                                value.join(", ") : value}
                                            </a>
                                        ))}
                                    
                                    {submission.profileImage && (
                                        <div className="mt-4">
                                        
                                            <h5 className="font-medium">Profile Image:</h5>
                                            {submission.profileImage instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(submission.profileImage)}
                                                    alt="Profile"
                                                    className="mt-2"
                                                    width="50"
                                                />
                                            ) : (
                                                <p>No valid image file uploaded.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
    </div>
              <div >
                    
                </div>
            </div>
          </div>
          
    );
};

export default page;
