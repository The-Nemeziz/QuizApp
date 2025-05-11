import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    Platform
} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useEffect, useState} from "react";
import {auth} from "../firebaseConfig";
import {onAuthStateChanged} from "firebase/auth"

import {createUserWithEmailAndPassword} from "firebase/auth"

export default function RegisterScreen({navigation}) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if (user){
                navigation.navigate("Home");
            }
        })

        return unsubscribe;

    }, [])

    const handleRegister = async() => {
        if(!email.trim() || !password.trim()){
            Alert.alert("Register", "Please fill the required fields.");
        }else{
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredentials => {
                }).catch(error => console.log(error));
        }
    }


    return (
            <View className="flex-1">
                <StatusBar barStyle="dark-content" />
                <View style={{paddingTop: hp(2), paddingHorizontal: 10}} className="flex-1 gap-8">
                    <View className="items-center content-center text-center">
                        <Image  style={{height: 150, width: 150, alignSelf: 'center'}}  resizeMode='center' source={require('../assets/images/register.png')} />
                    </View>

                    <View className="mt-1 ml-2" style={{paddingHorizontal: 0}}>
                        <Text style={{fontSize: 40, textAlign: 'center'}} className=" font-bold text-center text-neutral-800">Register</Text>

                    </View>

                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4 text-xl">Email Address:</Text>
                        <TextInput value={email} onChangeText={(text) => setEmail(text)}
                                   className="p-4 bg-green-500 text-xl text-white rounded-xl mb-3"
                                   placeholder = "Enter your email address"
                        />
                        <Text className="text-gray-700 ml-4 text-xl">Password:</Text>
                        <TextInput value={password} onChangeText={(text) => setPassword(text)}
                                   className="p-4 bg-green-500 text-xl text-white rounded-xl mb-3"
                                   secureTextEntry
                                   placeholder = "Enter your password"
                        />
                        <TouchableOpacity onPress={handleRegister} className="py-3 bg-yellow-400 rounded-xl">
                            <Text className="text-xl font-bold text-center text-gray-700">
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center">
                        <Text className="text-black  font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text className="font-semibold text-yellow-500">Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
    )
}
