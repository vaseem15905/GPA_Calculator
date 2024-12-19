// import React, { useState } from "react";
// import Tesseract from "tesseract.js";

// const FileUpload = () => {
//     const [data, setData] = useState([]);
//     const [cgpa, setCgpa] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [file, setFile] = useState(null);

//     const processExtractedText = (text) => {
//         console.log("Raw Extracted Text:", text);

//         const lines = text.split("\n");
//         const gradePattern = /\b(O|0|A\+|A|B\+|B|C|P|F)\b/i; // Includes O and 0
//         const creditPattern = /\b\d\b/; // Single-digit credits

//         const extractedData = [];
//         lines.forEach((line, index) => {
//             console.log(`Processing Line ${index + 1}:`, line);
//             const words = line.split(/\s+/); // Split line into words

//             for (let i = 0; i < words.length; i++) {
//                 let word = words[i];

//                 // Normalize 0 and o as O
//                 if (/^0$/i.test(word) || /^o$/i.test(word)) {
//                     word = "O";
//                 }

//                 // Check if the word matches a grade pattern
//                 if (gradePattern.test(word)) {
//                     const grade = word.toUpperCase(); // Normalize grade
//                     const creditIndex = i - 1; // Check left column for credit

//                     // Ensure preceding column has a valid credit value
//                     if (creditIndex >= 0 && creditPattern.test(words[creditIndex])) {
//                         const credit = parseInt(words[creditIndex], 10);
//                         console.log(`Found: Credit=${credit}, Grade=${grade}`);
//                         extractedData.push({ credit, grade });
//                     } else {
//                         console.warn(
//                             `Grade found without valid credit on line ${index + 1}: "${line}"`
//                         );
//                     }
//                 }
//             }
//         });

//         console.log("Processed Data:", extractedData);
//         return extractedData;
//     };

//     const calculateCGPA = (data) => {
//         let totalCredits = 0;
//         let totalPoints = 0;

//         const gradeToPoints = {
//             O: 10,
//             "A+": 9,
//             A: 8,
//             "B+": 7,
//             B: 6,
//             C: 5,
//             P: 4,
//             F: 0,
//         };

//         data.forEach(({ credit, grade }) => {
//             if (gradeToPoints[grade] !== undefined) {
//                 totalCredits += credit;
//                 totalPoints += credit * gradeToPoints[grade];
//             }
//         });

//         const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
//         console.log(`Total Credits: ${totalCredits}, Total Points: ${totalPoints}, CGPA: ${cgpa}`);
//         return cgpa;
//     };

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleUpload = () => {
//         if (!file) {
//             alert("Please select a file first!");
//             return;
//         }

//         setLoading(true);

//         Tesseract.recognize(file, "eng", {
//             logger: (m) => console.log(m),
//         })
//             .then(({ data: { text } }) => {
//                 const extractedData = processExtractedText(text);
//                 setData(extractedData);
//                 setCgpa(calculateCGPA(extractedData));
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("OCR Error:", err);
//                 setLoading(false);
//             });
//     };

//     return (
//         <div className="file-upload-container">
//             <h1>CGPA Calculator</h1>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload} disabled={loading}>
//                 {loading ? "Processing..." : "Upload"}
//             </button>
//             {loading ? (
//                 <p>Processing file...</p>
//             ) : (
//                 <>
//                     {data.length > 0 ? (
//                         <div>
//                             <h2>Extracted Data:</h2>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Credit</th>
//                                         <th>Grade</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {data.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{item.credit}</td>
//                                             <td>{item.grade}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             <h3>CGPA: {cgpa}</h3>
//                         </div>
//                     ) : (
//                         <p>No data extracted.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default FileUpload;



import React, { useState } from "react";
import Tesseract from "tesseract.js";

const FileUpload = () => {
    const [data, setData] = useState([]);
    const [cgpa, setCgpa] = useState(0);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const processExtractedText = (text) => {
        console.log("Raw Extracted Text:", text);

        const lines = text.split("\n");
        const gradePattern = /\b(O|0|A\+|A|B\+|B|C|P|F|At)\b/i; // Includes O, At and 0
        const creditPattern = /\b\d\b/; // Single-digit credits

        const extractedData = [];
        lines.forEach((line, index) => {
            console.log(`Processing Line ${index + 1}:`, line);
            const words = line.split(/\s+/); // Split line into words

            for (let i = 0; i < words.length; i++) {
                let word = words[i];

                // Normalize 0 and o as O
                if (/^0$/i.test(word) || /^o$/i.test(word)) {
                    word = "O";
                }

                // If the grade is "At", treat it as "A+"
                if (/^At$/i.test(word)) {
                    word = "A+";
                }

                // Check if the word matches a grade pattern
                if (gradePattern.test(word)) {
                    const grade = word.toUpperCase(); // Normalize grade
                    const creditIndex = i - 1; // Check left column for credit

                    // Ensure preceding column has a valid credit value
                    if (creditIndex >= 0 && creditPattern.test(words[creditIndex])) {
                        const credit = parseInt(words[creditIndex], 10);
                        console.log(`Found: Credit=${credit}, Grade=${grade}`);
                        extractedData.push({ credit, grade });
                    } else {
                        console.warn(
                            `Grade found without valid credit on line ${index + 1}: "${line}"`
                        );
                    }
                }
            }
        });

        console.log("Processed Data:", extractedData);
        return extractedData;
    };

    const calculateCGPA = (data) => {
        let totalCredits = 0;
        let totalPoints = 0;

        const gradeToPoints = {
            O: 10,
            "A+": 9,
            A: 8,
            "B+": 7,
            B: 6,
            C: 5,
            P: 4,
            F: 0,
        };

        data.forEach(({ credit, grade }) => {
            if (gradeToPoints[grade] !== undefined) {
                totalCredits += credit;
                totalPoints += credit * gradeToPoints[grade];
            }
        });

        const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
        console.log(`Total Credits: ${totalCredits}, Total Points: ${totalPoints}, CGPA: ${cgpa}`);
        return cgpa;
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        setLoading(true);

        Tesseract.recognize(file, "eng", {
            logger: (m) => console.log(m),
        })
            .then(({ data: { text } }) => {
                const extractedData = processExtractedText(text);
                setData(extractedData);
                setCgpa(calculateCGPA(extractedData));
                setLoading(false);
            })
            .catch((err) => {
                console.error("OCR Error:", err);
                setLoading(false);
            });
    };

    return (
        <div className="file-upload-container">
            <h1>CGPA Calculator</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Processing..." : "Upload"}
            </button>
            {loading ? (
                <p>Processing file...</p>
            ) : (
                <>
                    {data.length > 0 ? (
                        <div>
                            <h2>Extracted Data:</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Credit</th>
                                        <th>Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.credit}</td>
                                            <td>{item.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h3>CGPA: {cgpa}</h3>
                        </div>
                    ) : (
                        <p>No data extracted.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default FileUpload;
