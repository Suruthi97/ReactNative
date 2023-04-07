import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Modal, Animated } from 'react-native';
import { COLORS } from '../assets/themes/theme';
import data from '../data/QuizData';
import { StyleSheet } from 'react-native';

const Quiz = () => {
    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })

    const renderQuestion = () => {
        return (
            <View style={styles.questionContainer}>
                {/* Question Counter */}
                <View style={styles.questionCounter}>
                    <Text style={styles.currentQuestion}>{currentQuestionIndex + 1}</Text>
                    <Text style={styles.totalQuestion}>/ {allQuestions.length}</Text>
                </View>
                {/* Question */}
                <Text style={styles.questions}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }

    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOptionDisabled}
                            key={option}
                            style={{
                                borderWidth: 3,
                                borderColor: option == correctOption
                                    ? COLORS.success
                                    : option == currentOptionSelected
                                        ? COLORS.error
                                        : COLORS.secondary + '40',
                                backgroundColor: option == correctOption
                                    ? COLORS.success + '20'
                                    : option == currentOptionSelected
                                        ? COLORS.error + '20'
                                        : COLORS.secondary + '20',
                                height: 60,
                                borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10
                            }}>
                            <Text style={styles.option}>{option}</Text>

                            {/* Show green or red based on correct answer */}
                            {
                                option == correctOption ? (
                                    <View style={styles.correctOptionContainer}>
                                    </View>
                                ) : option == currentOptionSelected ? (
                                    <View style={styles.wrongOptionContainer}>
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionDisabled(true);
        if (selectedOption == correct_option) {
            // Set score
            setScore(score + 1)
        }
        // Show Next button
        setShowNextButton(true);
    }

    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {            
            // Show Score after last question
            setShowScore(true);
        }
        else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const restartQuiz = () => {
        setShowScore(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={styles.nextButton}>
                    <Text style={styles.nextButtonText} >Next</Text>
                </TouchableOpacity>
            )
        }
        else {
            return null;
        }
    }

    const renderProgressBar = () => {
        return (
            <View style={styles.progressBar}>
                <Animated.View style={[styles.progressBarAnimatedView, { width: progressAnim }]}></Animated.View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <View style={styles.viewContainer}>
                {/* Progressbar */}
                {renderProgressBar()}
                {/* Question */}
                {renderQuestion()}
                {/* Options */}
                {renderOptions()}
                {/* Next button */}
                {renderNextButton()}
                {/* Score */}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showScore}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreModalContainer}>
                            <Text style={styles.modalText}>{score > (allQuestions.length / 2) ? 'Congratulations' : 'Oops!'}</Text>
                            <View style={styles.modalAlignment}>
                                <Text style={{
                                    fontSize: 30,
                                    color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                                }}>{score}</Text>
                                <Text style={styles.totalQuestions}>/ {allQuestions.length}</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity style={styles.retryButton}>
                                <Text
                                    onPress={restartQuiz}
                                    style={styles.retryButtonText}>Retry Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background,
        position: 'relative'
    },
    questionContainer: {
        marginTop: 20
    },
    questionCounter: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    currentQuestion: {
        color: COLORS.white,
        fontSize: 20,
        opacity: 0.6,
        marginRight: 2
    },
    totalQuestion: {
        color: COLORS.white,
        fontSize: 18,
        opacity: 0.6
    },
    questions: {
        color: COLORS.white,
        fontSize: 30
    },
    option: {
        fontSize: 20,
        color: COLORS.white
    },
    correctOptionContainer: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: COLORS.success,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrongOptionContainer: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: COLORS.error,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButton: {
        marginTop: 20,
        width: '100%',
        backgroundColor: COLORS.accent,
        padding: 20,
        borderRadius: 5
    },
    nextButtonText: {
        fontSize: 20,
        color: COLORS.white,
        textAlign: 'center'
    },
    progressBar: {
        width: '100%',
        height: 20,
        borderRadius: 20,
        backgroundColor: COLORS.secondary + 40
    },
    progressBarAnimatedView: {
        height: 20,
        borderRadius: 20,
        backgroundColor: COLORS.accent
    },
    scoreContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreModalContainer: {
        backgroundColor: COLORS.white,
        width: '90%',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center'
    },
    modalText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    modalAlignment: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 20
    },
    totalQuestions: {
        fontSize: 20,
        color: COLORS.black
    },
    retryButton: {
        backgroundColor: COLORS.accent,
        padding: 20,
        width: '100%',
        borderRadius: 20
    },
    retryButtonText: {
        textAlign: 'center',
        color: COLORS.white,
        fontSize: 20
    }
});

export default Quiz;