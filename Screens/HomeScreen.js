import {View, Text, Image, Pressable} from "react-native";

import {auth} from "../firebaseConfig";
import {signOut} from "firebase/auth"

export default function HomeScreen({navigation}){

    const handleLogout =  () => {
        signOut(auth).then(() => navigation.replace("Login")).catch((error) => alert(error));
    }

    return (
        <View className="flex-1 bg-white items-center pt-20">
            <Image source={require("../assets/images/quiz-art.jpg")} style={{height:400,width:450}} />
            <Text className="text-2xl font-bold text-gray-900">Hello!! {auth.currentUser?.email}</Text>

            <Text className="text-2xl mt-10 font-light text-gray-900">Instructions</Text>

            <View className="mt-5 bg-amber-500 p-3 rounded">
                <Text className="text-xl text-white">Each question has four options</Text>
                <Text className="text-xl text-white">Your score will be shown at the end of the quiz</Text>
            </View>

            <View className="flex-row">
                <Pressable onPress={()=> navigation.navigate("Category")} className="bg-amber-400 ml-2 mt-10 px-4 py-1 mr-5 rounded">
                    <Text className="text-white text-2xl">Start</Text>
                </Pressable>

                <Pressable onPress={()=> navigation.navigate("Leaderboard")} className="bg-amber-400 mt-10 px-4 py-1 mr-5 rounded">
                    <Text className="text-white text-2xl">LeaderBoard</Text>
                </Pressable>

                <Pressable onPress={handleLogout} className="bg-red-600 mt-10 ml-2 px-4 py-1 rounded">
                    <Text className="text-white text-2xl">Logout</Text>
                </Pressable>
            </View>





        </View>
    )
}
