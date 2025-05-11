import {ActivityIndicator, Alert, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {database} from "../firebaseConfig";
import {Fragment, useEffect, useState} from "react";
import {collection, getDocs, where, query} from "firebase/firestore"
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";

export default function QuizScreen({navigation, route}){

    const [questions, setQuestion] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [isShown, setIsShown] = useState(false)
    const [key, setKey] = useState(0);

    const {category} = route.params;

    useEffect(() => {
        getQuestions(category);
        setCurrentQuestionIndex(0)
    }, [])


    const getQuestions = async () => {
        setSelectedOption(null);
        setShowResults(false);
        const questionRef = query(collection(database, "questions"), where("category", "==", category));
        const snapshot = await getDocs(questionRef);
        if (snapshot.empty) {
            console.log("No matching documents");
            return;
        }
        const allQuestions = snapshot.docs.map(doc => doc.data());
        const shuffleQuestions = allQuestions.sort(() => 0.5 - Math.random());
        console.log(shuffleQuestions);
        setQuestion(shuffleQuestions.slice(0, 10));
    }

    const handleOptionSelect = (option, index) => {
        setSelectedOption(option);



        const isAnswerCorrect = questions[currentQuestionIndex].correctOption === index;

        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            setScore(prevScore => prevScore + 10);
        }

        console.log(isAnswerCorrect);

        handleNext()

    }

    const handleNext = () => {
        if (currentQuestionIndex === questions.length - 1) {
            navigation.navigate("Score", {score: score, category: category});
            return;
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null)
        setIsCorrect(null)
        setKey((prev) => prev + 1)
    }



    console.log(score)

    return (
        <View className="flex-1 mt-20 p-4">
            {questions.length > 0 ?  (

                <Fragment>
                    <View className="flex-row mb-5">
                        <Text className="text-3xl mt-3 align-text-bottom mb-2">{currentQuestionIndex+1} / {questions.length}</Text>
                        <View className="ml-72">
                            <CountdownCircleTimer  key={key} size={65} isPlaying={true} className="text-right " duration={15} colors={['#004777', '#F7B801', '#A30000', '#A30000']} colorsTime={[7, 5, 2, 0]}  onComplete={handleNext}>
                                {({ remainingTime }) => <Text className="text-right">{remainingTime}</Text>}
                            </CountdownCircleTimer>
                        </View>
                    </View>


                    <Text className="text-3xl mb-12">{questions[currentQuestionIndex].question}</Text>
                        <View>
                            <TouchableOpacity onPress={() => handleOptionSelect(questions[currentQuestionIndex].option1, 1)}>
                                <Text className="border-2 p-4 my-2 text-lg rounded-md border-orange-400">{questions[currentQuestionIndex].option1}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleOptionSelect(questions[currentQuestionIndex].option2, 2)}>
                                <Text className="border-2 p-4 my-2 text-lg rounded-md border-orange-400">{questions[currentQuestionIndex].option2}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleOptionSelect(questions[currentQuestionIndex].option3, 3)}>
                                <Text className="border-2 p-4 my-2 text-lg rounded-md border-orange-400">{questions[currentQuestionIndex].option3}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleOptionSelect(questions[currentQuestionIndex].option4, 4)}>
                                <Text className="border-2 p-4 my-2 text-lg rounded-md border-orange-400">{questions[currentQuestionIndex].option4}</Text>
                            </TouchableOpacity>




                        </View>
                    <Pressable className="bg-orange-500 p-4 rounded-lg mt-12" onPress={handleNext}>
                        <Text className="text-white text-center text-2xl font-bold">
                            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Skip"}
                        </Text>
                    </Pressable>
                </Fragment>

            ) : (
                <LoadingAnimation isShown={true} />
            )}
        </View>
    )
}

function LoadingAnimation({isShown}){
    return (
        <View >
            <ActivityIndicator size="large" animating={isShown}  />
            <Text>Loading ...</Text>
        </View>
    );
}

