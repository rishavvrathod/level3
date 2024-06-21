import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteProgrammingLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: ''
    });

    const [errors, setErrors] = useState({});
    const [additionalQuestions, setAdditionalQuestions] = useState([]);

    useEffect(() => {
        if (formData.surveyTopic) {
            axios.get(`https://api.example.com/questions?topic=${formData.surveyTopic}`)
                .then(response => setAdditionalQuestions(response.data))
                .catch(error => console.error('Error fetching additional questions:', error));
        }
    }, [formData.surveyTopic]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';
        if (formData.surveyTopic === 'Technology') {
            if (!formData.favoriteProgrammingLanguage) newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
            if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of Experience is required';
        }
        if (formData.surveyTopic === 'Health') {
            if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
            if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
        }
        if (formData.surveyTopic === 'Education') {
            if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
            if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
        }
        if (!formData.feedback) newErrors.feedback = 'Feedback is required';
        else if (formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Here you can handle the form submission (e.g., send data to an API)
            console.log('Form data:', formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                {errors.fullName && <p>{errors.fullName}</p>}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Survey Topic</label>
                <select
                    name="surveyTopic"
                    value={formData.surveyTopic}
                    onChange={handleChange}
                >
                    <option value="">Select</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>
                {errors.surveyTopic && <p>{errors.surveyTopic}</p>}
            </div>

            {formData.surveyTopic === 'Technology' && (
                <>
                    <div>
                        <label>Favorite Programming Language</label>
                        <select
                            name="favoriteProgrammingLanguage"
                            value={formData.favoriteProgrammingLanguage}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C#">C#</option>
                        </select>
                        {errors.favoriteProgrammingLanguage && <p>{errors.favoriteProgrammingLanguage}</p>}
                    </div>
                    <div>
                        <label>Years of Experience</label>
                        <input
                            type="number"
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                        />
                        {errors.yearsOfExperience && <p>{errors.yearsOfExperience}</p>}
                    </div>
                </>
            )}

            {formData.surveyTopic === 'Health' && (
                <>
                    <div>
                        <label>Exercise Frequency</label>
                        <select
                            name="exerciseFrequency"
                            value={formData.exerciseFrequency}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Rarely">Rarely</option>
                        </select>
                        {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}
                    </div>
                    <div>
                        <label>Diet Preference</label>
                        <select
                            name="dietPreference"
                            value={formData.dietPreference}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                        </select>
                        {errors.dietPreference && <p>{errors.dietPreference}</p>}
                    </div>
                </>
            )}

            {formData.surveyTopic === 'Education' && (
                <>
                    <div>
                        <label>Highest Qualification</label>
                        <select
                            name="highestQualification"
                            value={formData.highestQualification}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="High School">High School</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                        </select>
                        {errors.highestQualification && <p>{errors.highestQualification}</p>}
                    </div>
                    <div>
                        <label>Field of Study</label>
                        <input
                            type="text"
                            name="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={handleChange}
                        />
                        {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
                    </div>
                </>
            )}

            <div>
                <label>Feedback</label>
                <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                ></textarea>
                {errors.feedback && <p>{errors.feedback}</p>}
            </div>

            <button type="submit">Submit</button>

            {additionalQuestions.length > 0 && (
                <div>
                    <h3>Additional Questions</h3>
                    {additionalQuestions.map((question, index) => (
                        <div key={index}>
                            <label>{question.text}</label>
                            <input
                                type={question.type}
                                name={`additional_${index}`}
                                value={formData[`additional_${index}`] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SurveyForm;
