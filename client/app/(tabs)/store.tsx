import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { SafeAreaView } from "react-native-safe-area-context";

// Main Component
export default function Home() {
  const [selectedTab, setSelectedTab] = useState("day");

  const styles = {
    header: {
      fontSize: 32,
      fontWeight: "600",
      paddingTop: 60,
    },
    subheader: {
      fontSize: 14,
      marginBottom: 25,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    backButton: {
      backgroundColor: "#92C7CF",
      borderRadius: 10,
      padding: 18,
      marginTop: 20,
      marginRight: 15,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    container: {
      backgroundColor: "#FBF9F1",
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 30,
      paddingRight: 30,
      height: '100%',
    },
    gridContainer: {
      padding: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      paddingTop: 35,
      paddingBottom: 15,
      paddingHorizontal: 30,
      borderRadius: 20,
    },
    gridItem: {
      width: "30%",
      marginBottom: 20,
      alignItems: "center",
      padding: 5,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#e6e4df",   
    },
    expenseBreakdown: {
      fontSize: 20,
      fontWeight: "600",
      paddingTop: 40,
    },
    listContainer: {
      backgroundColor: "white",
      padding: 22,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    //   height: 300,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    tabButton: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "#92C7CF",
      borderRadius: 15,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
    },
    activeTab: {
      backgroundColor: "#7FA7B7",
    },
    tabText: {
      color: "white",
      fontSize: 12, 
      fontWeight: "600",
    },
  };

  const images = [
    require("./../../assets/images/shopee.jpg"),
    require("./../../assets/images/lazada.png"),
    require("./../../assets/images/amazon.jpg"),
    require("./../../assets/images/shein.png"),
    require("./../../assets/images/tiktok.png"),
    require("./../../assets/images/foodpanda.png"),
  ];

  const renderExpenseData = () => {
    switch (selectedTab) {
      case "day":
        return <Text>Today's expenses: ₱50</Text>;
      case "month":
        return <Text>This month's expenses: ₱500</Text>;
      case "year":
        return <Text>This year's expenses: ₱5000</Text>;
      case "lifetime":
        return <Text>Total lifetime expenses: ₱20000</Text>;
      default:
        return <Text>Select a time period</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      {/* Header */}

      <Text style={styles.header}>Connected Stores</Text>
      <Text style={styles.subheader}>
        Link your favorite grocery stores to track expenses
      </Text>

      {/* Grid of Images */}
      <View style={styles.gridContainer}>
        {images.map((image, index) => (
          <TouchableOpacity style={styles.gridItem} key={index}>
            <View>
              <Image source={image} alt={`image-₱{index}`} style={{ width: 100, height: 100 }} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.expenseBreakdown}>Expense Breakdown</Text>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {["day", "month", "year", "lifetime"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={styles.tabText}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Box style={styles.listContainer}>
        {/* Render Expense Breakdown Data */}
        {renderExpenseData()}
      </Box>
    </ScrollView>
    </SafeAreaView>
  );
}
