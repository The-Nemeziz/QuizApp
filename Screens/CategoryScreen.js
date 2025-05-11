import {Text, TouchableOpacity, View} from "react-native";

export default function CategoryScreen({navigation}){
    return (
        <View className="flex-1  items-center">

            <Text className="mt-20 text-3xl font-bold">Choose From Any Of The Following Subject Categories</Text>

            <View className="flex-row items-center mt-20">
                <TouchableOpacity className="h-36 w-44 ml-0 mr-4 shadow-xl justify-center rounded-2xl items-center bg-fuchsia-700" onPress={()=>navigation.navigate("Quiz", {category: "world-affairs"})}>
                    <Text className="text-2xl text-white">World Affairs</Text>
                </TouchableOpacity>

                <TouchableOpacity className="h-36 w-44 ml-4 shadow-xl justify-center rounded-2xl items-center bg-green-500" onPress={()=>navigation.navigate("Quiz", {category: "science"})}>
                    <Text className="text-2xl text-white">Science And Technology</Text>
                </TouchableOpacity>

            </View>

            <View className="flex-row items-center mt-20">
                <TouchableOpacity className="h-36 w-44 ml-0 mr-4 shadow-xl justify-center rounded-2xl items-center bg-fuchsia-700" onPress={()=>navigation.navigate("Quiz", {category: "technology"})}>
                    <Text className="text-2xl text-white">Technology</Text>
                </TouchableOpacity>

                <TouchableOpacity className="h-36 w-44 ml-4 shadow-xl justify-center rounded-2xl items-center bg-green-500" onPress={()=>navigation.navigate("Quiz", {category: "sports"})}>
                    <Text className="text-2xl text-white">Sports</Text>
                </TouchableOpacity>

            </View>

            <View className="flex-row items-center mt-20">
                <TouchableOpacity className="h-36 w-44 ml-0 mr-4 shadow-xl justify-center rounded-2xl items-center bg-fuchsia-700" onPress={()=>navigation.navigate("Quiz", {category: "literature"})}>
                    <Text className="text-2xl text-white">Literature</Text>
                </TouchableOpacity>

                <TouchableOpacity className="h-36 w-44 ml-4 shadow-xl justify-center rounded-2xl items-center bg-green-500" onPress={()=>navigation.navigate("Quiz", {category: "movies"})}>
                    <Text className="text-2xl text-white">Movies</Text>
                </TouchableOpacity>

            </View>



        </View>
    )
}
