
// // import React, { useState } from "react";
// // import Tesseract from "tesseract.js";

// // const FileUpload = () => {
// //     const [data, setData] = useState([]);
// //     const [cgpa, setCgpa] = useState(0);
// //     const [loading, setLoading] = useState(false);
// //     const [file, setFile] = useState(null);

// //     const processExtractedText = (text) => {
// //         console.log("Raw Extracted Text:", text);

// //         const lines = text.split("\n");
// //         const gradePattern = /\b(O|0|A\+|A|B\+|B|C|P|F|At)\b/i; // Includes O, At and 0
// //         const creditPattern = /\b\d\b/; // Single-digit credits

// //         const extractedData = [];
// //         lines.forEach((line, index) => {
// //             console.log(`Processing Line ${index + 1}:`, line);
// //             const words = line.split(/\s+/); // Split line into words

// //             for (let i = 0; i < words.length; i++) {
// //                 let word = words[i];

// //                 // Normalize 0 and o as O
// //                 if (/^0$/i.test(word) || /^o$/i.test(word)) {
// //                     word = "O";
// //                 }

// //                 // If the grade is "At", treat it as "A+"
// //                 if (/^At$/i.test(word)) {
// //                     word = "A+";
// //                 }

// //                 // Check if the word matches a grade pattern
// //                 if (gradePattern.test(word)) {
// //                     const grade = word.toUpperCase(); // Normalize grade
// //                     const creditIndex = i - 1; // Check left column for credit

// //                     // Ensure preceding column has a valid credit value
// //                     if (creditIndex >= 0 && creditPattern.test(words[creditIndex])) {
// //                         const credit = parseInt(words[creditIndex], 10);
// //                         console.log(`Found: Credit=${credit}, Grade=${grade}`);
// //                         extractedData.push({ credit, grade });
// //                     } else {
// //                         console.warn(
// //                             `Grade found without valid credit on line ${index + 1}: "${line}"`
// //                         );
// //                     }
// //                 }
// //             }
// //         });

// //         console.log("Processed Data:", extractedData);
// //         return extractedData;
// //     };

// //     const calculateCGPA = (data) => {
// //         let totalCredits = 0;
// //         let totalPoints = 0;

// //         const gradeToPoints = {
// //             O: 10,
// //             "A+": 9,
// //             A: 8,
// //             "B+": 7,
// //             B: 6,
// //             C: 5,
// //             P: 4,
// //             F: 0,
// //         };

// //         data.forEach(({ credit, grade }) => {
// //             if (gradeToPoints[grade] !== undefined) {
// //                 totalCredits += credit;
// //                 totalPoints += credit * gradeToPoints[grade];
// //             }
// //         });

// //         const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
// //         console.log(`Total Credits: ${totalCredits}, Total Points: ${totalPoints}, CGPA: ${cgpa}`);
// //         return cgpa;
// //     };

// //     const handleFileChange = (event) => {
// //         setFile(event.target.files[0]);
// //     };

// //     const handleUpload = () => {
// //         if (!file) {
// //             alert("Please select a file first!");
// //             return;
// //         }

// //         setLoading(true);

// //         Tesseract.recognize(file, "eng", {
// //             logger: (m) => console.log(m),
// //         })
// //             .then(({ data: { text } }) => {
// //                 const extractedData = processExtractedText(text);
// //                 setData(extractedData);
// //                 setCgpa(calculateCGPA(extractedData));
// //                 setLoading(false);
// //             })
// //             .catch((err) => {
// //                 console.error("OCR Error:", err);
// //                 setLoading(false);
// //             });
// //     };

// //     return (
// //         <div className="file-upload-container">
// //             <h1>CGPA Calculator</h1>
// //             <input type="file" onChange={handleFileChange} />
// //             <button onClick={handleUpload} disabled={loading}>
// //                 {loading ? "Processing..." : "Upload"}
// //             </button>
// //             {loading ? (
// //                 <p>Processing file...</p>
// //             ) : (
// //                 <>
// //                     {data.length > 0 ? (
// //                         <div>
// //                             <h2>Extracted Data:</h2>
// //                             <table>
// //                                 <thead>
// //                                     <tr>
// //                                         <th>Credit</th>
// //                                         <th>Grade</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {data.map((item, index) => (
// //                                         <tr key={index}>
// //                                             <td>{item.credit}</td>
// //                                             <td>{item.grade}</td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                             </table>
// //                             <h3>CGPA: {cgpa}</h3>
// //                         </div>
// //                     ) : (
// //                         <p>No data extracted.</p>
// //                     )}
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default FileUpload;


// import React, { useState } from "react";
// import Tesseract from "tesseract.js";

// const FileUpload = () => {
//     const [data, setData] = useState([]);
//     const [cgpa, setCgpa] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [file, setFile] = useState(null);
//     const [imageSrc, setImageSrc] = useState(null); // For displaying image
//     const [croppedImageSrc, setCroppedImageSrc] = useState(null); // For displaying cropped image

//     const processExtractedText = (text) => {
//         console.log("Raw Extracted Text:", text);

//         const lines = text.split("\n");
//         const gradePattern = /\b(O|0|A\+|A|B\+|B|C|P|F|At)\b/i; // Includes O, At and 0
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

//                 // If the grade is "At", treat it as "A+"
//                 if (/^At$/i.test(word)) {
//                     word = "A+";
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
//         setImageSrc(URL.createObjectURL(event.target.files[0])); // Display selected image
//         setCroppedImageSrc(null); // Reset cropped image on new file selection
//     };

//     const enhanceImageResolution = (imageElement) => {
//         const cv = window.cv;
//         const src = cv.imread(imageElement);
        
//         // Resize the image
//         const dsize = new cv.Size(src.cols * 2, src.rows * 2); // Double the size
//         const resizedImage = new cv.Mat();
//         cv.resize(src, resizedImage, dsize, 0, 0, cv.INTER_CUBIC); // Use INTER_CUBIC for better quality

//         // Apply Gaussian blur to reduce noise
//         const blurredImage = new cv.Mat();
//         cv.GaussianBlur(resizedImage, blurredImage, new cv.Size(5, 5), 0); // Reduce noise

//         // Sharpen the image
//         const sharpenedImage = new cv.Mat();
//         const kernel = cv.matFromArray(3, 3, cv.CV_32F, [
//             0, -1, 0,
//             -1, 5, -1,
//             0, -1, 0
//         ]);
//         cv.filter2D(blurredImage, sharpenedImage, cv.CV_8U, kernel); // Sharpen the image

//         // Clean up intermediate images
//         src.delete();
//         resizedImage.delete();
//         blurredImage.delete();

//         return sharpenedImage; // Return the enhanced image
//     };

//     const handleImageUpload = async () => {
//         if (file) {
//             setLoading(true);
//             const { data: { text } } = await Tesseract.recognize(file, 'eng');
//             const extractedData = processExtractedText(text);
//             const calculatedCGPA = calculateCGPA(extractedData);
//             setCgpa(calculatedCGPA);
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h1>File Upload and CGPA Calculator</h1>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             <button onClick={handleImageUpload} disabled={loading}>
//                 {loading ? "Processing..." : "Upload and Calculate CGPA"}
//             </button>
//             {imageSrc && <img src={imageSrc} alt="Uploaded" id="inputImage" />}
//             {croppedImageSrc && <img src={croppedImageSrc} alt="Cropped" />}
//             {cgpa > 0 && <h2>Your CGPA: {cgpa}</h2>}
//         </div>
//     );
// };
// export default FileUpload;






import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const FileUpload = () => {
    const [data, setData] = useState([]);
    const [cgpa, setCgpa] = useState(0);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null); // For displaying image
    const [croppedImageSrc, setCroppedImageSrc] = useState(null); // For storing cropped image
    const [croppedImage, setCroppedImage] = useState(null); // Store cropped image

    // Initialize Cropper ref
    const cropperRef = useRef(null);

    // Handle file change and set image source
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setImageSrc(URL.createObjectURL(event.target.files[0]));
        setCroppedImageSrc(null); // Reset cropped image when new file is selected
    };

    // Function to extract text from image using Tesseract.js
    const handleImageUpload = async () => {
        if (file) {
            setLoading(true);
            const { data: { text } } = await Tesseract.recognize(file, 'eng');
            const extractedData = processExtractedText(text);
            const calculatedCGPA = calculateCGPA(extractedData);
            setCgpa(calculatedCGPA);
            setLoading(false);
        }
    };

    // Function to process extracted text and parse grades and credits
    const processExtractedText = (text) => {
        console.log("Raw Extracted Text:", text);
        const lines = text.split("\n");
        const gradePattern = /\b(O|0|A\+|A|B\+|B|C|P|F|At)\b/i; // Includes O, At, and 0
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

    // Function to calculate CGPA
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

    // Handle crop image logic with react-cropper
    const getCroppedImage = () => {
        if (cropperRef.current) {
            // Get the cropped canvas
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
            const croppedImageSrc = croppedCanvas.toDataURL("image/jpeg");
            setCroppedImageSrc(croppedImageSrc);
            setCroppedImage(croppedImageSrc); // Store the cropped image
        }
    };

    return (
        <div>
            <h1>File Upload and CGPA Calculator</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleImageUpload} disabled={loading}>
                {loading ? "Processing..." : "Upload and Calculate CGPA"}
            </button>

            {/* Image cropping section using react-cropper */}
            {imageSrc && (
                <div>
                    <Cropper
                        ref={cropperRef}
                        src={imageSrc}
                        guides={false}
                        style={{ height: "400px", width: "100%" }}
                    />
                    <button onClick={getCroppedImage}>Crop Image</button>
                </div>
            )}

            {/* Display cropped image */}
            {croppedImageSrc && <img src={croppedImageSrc} alt="Cropped" />}

            {/* Display the extracted and processed data */}
            {data.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Credit</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.credit}</td>
                                <td>{entry.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Display CGPA */}
            {cgpa > 0 && <h2>Your CGPA: {cgpa}</h2>}
        </div>
    );
};

export default FileUpload;
