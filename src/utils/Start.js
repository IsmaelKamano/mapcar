// import { 
//   View, 
//   Text, 
//   SafeAreaView, 
//   StyleSheet, 
//   Dimensions, 
//   Image, 
//   TouchableOpacity 
// } from "react-native";
// import LogoLispy from "../components/logoLispy";
// import images from "../assets/index";
// import Header from "../components/Header";
// const { width } = Dimensions.get("window");

// const Start = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />

//       {/* En-tête de la publication */}
//       <View style={styles.header}>
//         <Image style={{ width: 45, height: 45 }} source={images.profilHomme} />
        
//         <View style={styles.headerText}>
//           <Text style={styles.nom}>Nom Startup</Text>
//           <Text style={styles.date}>Il y a 2 h</Text>
//         </View>
//       </View>

//       {/* Texte de la publication */}
//       <View style={styles.postText}>
//         <Text style={styles.description}>
//           Voici une petite description comme dans une publication Facebook. 🚀
//         </Text>
//       </View>

//       {/* Image principale */}
//       <Image 
//         source={images.ginhoSong} 
//         style={styles.imagePost} 
//         resizeMode="cover"
//       />

//       {/* Boutons d'interaction */}
//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionText}>👍 Like</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionText}>💬 Commentaire</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Text style={styles.actionText}>🤝 Partager</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Start;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 12,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   headerText: {
//     marginLeft: 10,
//   },
//   nom: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#222",
//   },
//   date: {
//     fontSize: 12,
//     color: "#777",
//   },
//   postText: {
//     marginBottom: 8,
//     paddingHorizontal: 4,
//   },
//   description: {
//     fontSize: 14,
//     color: "#333",
//   },
//   imagePost: {
//     width: width * 0.95,
//     height: 220,
//     borderRadius: 10,
//     alignSelf: "center",
//     marginVertical: 10,
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderColor: "#eee",
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   actionText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#444",
//   },
// });



import { View, TextInput, Text, StyleSheet } from "react-native";

import BoutonConnexion from "../components/BoutonConnexion";


const TestSaisie = () => {
  return (
    <View style={styles.postText}>
        <Text style={styles.description}>
          Voici une petite description comme dans une publication Facebook. 🚀
        </Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {

  },
  
})


export default TestSaisie