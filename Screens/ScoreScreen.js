import {View, Text, Image, Pressable, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons"


import {auth} from "../firebaseConfig";
import {database} from "../firebaseConfig";
import {signOut} from "firebase/auth"
import {collection, addDoc, doc} from "firebase/firestore"
import {useRoute} from "@react-navigation/native";

export default function ScoreScreen({navigation}) {

    const handleLogout =  () => {
        signOut(auth).then(() => navigation.replace("Login")).catch((error) => alert(error));
    }

    const uploadScore = async() => {
        const email = auth.currentUser.email;
        const data = {
            email: email,
            score: score,
            category: category
        }

        const docRef = await addDoc(collection(database, "scores"), data);

        console.log("Document written with ID: ", docRef.id);

        navigation.navigate("Leaderboard");

    }


    const route = useRoute()
    const {score, category} = route.params

    console.log(category)


    return (
        <View className="flex-1 bg-white items-center">
            <Image source={require("../assets/images/4881.jpg_wh1200.jpg")} style={{height:400,width:450}} />


            <Text className="text-3xl font-bold mt-5">
                Congratulations, you had {score} points in the {category} category
            </Text>


            <View className="mt-20 flex-col">
                <Pressable onPress={() => navigation.navigate("Category")} className="bg-amber-400 mt-10 rounded-md px-2 py-1 rounded">
                    <Text className="text-white text-3xl">Take Another Quiz</Text>
                </Pressable>

                <Pressable onPress={uploadScore} className="bg-blue-800 flex-row rounded-md justify-center items-center text-center mt-10 px-2 py-1 rounded">
                    <MaterialCommunityIcons name="trophy" size={40} color="white" />
                    <Text className="text-white text-3xl">Leaderboard</Text>
                </Pressable>

                <Pressable onPress={handleLogout} className="bg-red-600 flex-row rounded-md mt-10 items-center text-center justify-center px-2 py-1 rounded">
                    <MaterialCommunityIcons name="home" size={40} color="white" />
                    <Text className="text-white mt-1 text-3xl">Logout</Text>
                </Pressable>
            </View>


        </View>
    )
}
