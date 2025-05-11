import {View, Text, FlatList, ActivityIndicator} from "react-native";

import {database} from "../firebaseConfig";
import {collection, getDocs, orderBy, limit, query} from "firebase/firestore";
import {Fragment, useEffect, useState} from "react";

export default function LeaderBoardScreen() {

    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const leaderboardRef
                    = collection(database, 'scores'); // Assuming scores are stored in a 'scores' collection
                const q = query(leaderboardRef, orderBy('score', 'desc'), limit(10));
                const querySnapshot = await getDocs(q);

                const leaderboardData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setLeaderboardData(leaderboardData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
    }, []);


    return (
        <View className="flex-1 p-4">
            <View className="flex-row mt-10">
                <Text className="text-2xl font-bold">LEADERBOARD</Text>

            </View>

            <View className="flex flex-col mt-5">
                <View className="flex flex-row justify-between bg-gray-200 p-2">
                    <Text className="text-center w-1/4">Rank</Text>
                    <Text className="text-center w-1/2">Email</Text>
                    <Text className="text-center w-1/4">Score</Text>
                </View>


                {leaderboardData.length > 0 ? (
                    <Fragment>
                        <FlatList
                            data={leaderboardData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View className="flex flex-row justify-between border-b p-2">
                                    <Text className="text-center w-1/4">{index + 1}</Text>
                                    <Text className="text-center w-1/2">{item.email}</Text>
                                    <Text className="text-center w-1/4">{item.score}</Text>
                                </View>
                            )}
                        />
                    </Fragment>
                ) : (
                    <LoadingAnimation isShown={true} />
                )}


            </View>
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
