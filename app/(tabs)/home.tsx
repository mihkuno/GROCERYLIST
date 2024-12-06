import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Icon, AddIcon, ChevronRightIcon } from "@/components/ui/icon";

// Grocery list data
const groceryLists = [
    {
        id: 1,
        title: "Weekly Groceries",
        subtitle: "15 items • Created Today",
    },
    {
        id: 2,
        title: "Monthly Supplies",
        subtitle: "8 items • Created 4 days ago",
    },
    {
        id: 3,
        title: "Yearly Supplies",
        subtitle: "244 items • Created 2 years ago",
    },
];

// ListItem Component
const ListItem = ({ title, subtitle }) => {
    const [opacity, setOpacity] = useState(1);

    const handlePressIn = () => setOpacity(0.6);
    const handlePressOut = () => setOpacity(1);

    const styles = {
        container: {
            marginTop: 10,
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 18,
            paddingBottom: 18,
            paddingLeft: 26,
            paddingRight: 26,
            opacity,
        },
        title: {
            fontSize: 14,
            fontWeight: 600,
        },
        subtitle: {
            fontSize: 12,
        },
        icon: {
            opacity, // Apply the same opacity state to the icon
        },
    };

    return (
        <Pressable
            style={styles.container}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Box>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </Box>
            <Icon as={ChevronRightIcon} style={styles.icon} />
        </Pressable>
    );
};

// Main Component
export default function Home() {
    const [buttonOpacity, setButtonOpacity] = useState(1);

    const handleButtonPressIn = () => setButtonOpacity(0.6);
    const handleButtonPressOut = () => setButtonOpacity(1);

    const styles = {
        header: {
            fontSize: 32,
            fontWeight: 600,
            paddingTop: 40,
        },
        subheader: {
            fontSize: 16,
            marginBottom: 25,
        },
        scrollContainer: {
            backgroundColor: "#FBF9F1",
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 30,
            paddingRight: 30,
            flexGrow: 1,
        },
        createListButton: {
            backgroundColor: "#92C7CF",
            borderRadius: 30,
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            opacity: buttonOpacity,
        },
        createListText: {
            fontSize: 18,
            color: "white",
        },
        createListIcon: {
            marginTop: -3,
            color: "white",
        },
        listContainer: {
            backgroundColor: "white",
            padding: 22,
            marginTop: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        listTitle: {
            textAlign: "center",
            marginTop: 5,
            marginBottom: 12,
            fontSize: 20,
            fontWeight: 600,
        },
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.header}>My Groceries</Text>
            <Text style={styles.subheader}>Create and manage your shopping lists</Text>

            <Button
                size="md"
                variant="solid"
                action="primary"
                style={styles.createListButton}
                onPressIn={handleButtonPressIn}
                onPressOut={handleButtonPressOut}
            >
                <Icon as={AddIcon} size="xl" style={styles.createListIcon} />
                <ButtonText style={styles.createListText}>Create New List</ButtonText>
            </Button>

            <Box style={styles.listContainer}>
                <Text style={styles.listTitle}>My Lists</Text>
                {groceryLists.map((list) => (
                    <ListItem key={list.id} title={list.title} subtitle={list.subtitle} />
                ))}
            </Box>
        </ScrollView>
    );
}
