import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Icon, AddIcon, ChevronRightIcon, ArrowLeftIcon } from "@/components/ui/icon";

// Main Component
export default function Home() {
    const [buttonOpacity, setButtonOpacity] = useState(1);

    const handleButtonPressIn = () => setButtonOpacity(0.6);
    const handleButtonPressOut = () => setButtonOpacity(1);

    const styles = {
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        header: {
            paddingVertical: 20,
            fontSize: 20,
            fontWeight: 600,
        },
        subheader: {
            fontSize: 14,
            marginBottom: 25,
        },
        container: {
            backgroundColor: "#FBF9F1",
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 30,
            paddingRight: 30,
            flexGrow: 1,
        },
        backButton: {
            backgroundColor: "#92C7CF",
            borderRadius: 10,
            height: 60,
            width: 60,
            marginRight: 15,
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
        backIcon: {
            marginTop: -3,
            color: "white",
        },
        cartContainer: {
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 30,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        cartItemContainer: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            padding: 20,
            backgroundColor: 'green'
        },
        cartScrollable: {
            // backgroundColor: 'red',
        },
        cartSummary: {
            marginTop: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            padding: 20,
            backgroundColor: 'blue'
        }


    };

    return (
        <Box style={styles.container}>
            <Box style={styles.headerContainer}>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    style={styles.backButton}
                    onPressIn={handleButtonPressIn}
                    onPressOut={handleButtonPressOut}
                >
                    <Icon as={ArrowLeftIcon} size="2xl" style={styles.backIcon} />
                </Button>
                <Text style={styles.header}>(Title)Weekly Groceries</Text>     
            </Box>

            <Box style={styles.cartContainer}>
                <ScrollView style={styles.cartScrollable}>
                    <Box style={styles.cartItemContainer}>
                        <Text>Something</Text>
                    </Box>
                    <Box style={styles.cartSummary}>
                        <Text>Another Thing</Text>
                    </Box>
                </ScrollView>
            </Box>
        </Box>
    );
}
