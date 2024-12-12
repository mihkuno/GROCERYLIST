import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon, ArrowLeftIcon } from "@/components/ui/icon";
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

// Data object for items and details
const initialData = {
    headerTitle: "Title sa List",
    items: [
        { name: "Milk (2 gallons)", price: "5.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
        { name: "Eggs (1 dozen)", price: "1.96", isChecked: false },
    ],
    details: {
        created: "June 15, 2023",
        lastUpdated: "June 15, 2023",
        itemsCompleted: 0,
    },
};

export default function Home() {
    const [data, setData] = useState(initialData);
    const [isPressed, setIsPressed] = useState(false);

    const handleCheckboxChange = (index) => {
        const updatedItems = [...data.items];
        updatedItems[index].isChecked = !updatedItems[index].isChecked;
    
        // Count the number of checked items
        const itemsCompleted = updatedItems.filter(item => item.isChecked).length;
    
        // Calculate the total of checked items
        const total = updatedItems
            .filter(item => item.isChecked)
            .reduce((sum, item) => sum + parseFloat(item.price), 0); // Directly parse price as a number
    
        setData({
            ...data,
            items: updatedItems,
            details: {
                ...data.details,
                itemsCompleted,
            },
            total: total.toFixed(2), // Store the total as a string with 2 decimal places
        });
    };

    const styles = {
        headerContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
        },
        headerTitleContainer: {
            
        },
        backButton: {
            backgroundColor: "#92C7CF",
            borderRadius: 10,
            padding: 18,
            marginRight: 15,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,  
        },
        header: {
            lineHeight: 30,
            fontSize: 20,
            fontWeight: "600",
        },
        container: {
            backgroundColor: "#FBF9F1",
            paddingTop: 50,
            paddingBottom: 50,
            paddingHorizontal: 30,
            flexGrow: 1,
        },
        itemContainer: {
            backgroundColor: "white",
            padding: 22,
            marginTop: 20,
            borderRadius: 20,            
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            minHeight: 270,
            height: "57%",
        },
        detailContainer: {
            backgroundColor: "white",
            padding: 22,
            marginTop: 20,
            borderRadius: 20,            
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            minHeight: 150,
        },
        itemRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
        },
        totalRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
            marginTop: 10,
            borderTopColor: '#E5E5E5',
            borderTopWidth: 1,
        },
        itemText: {
            fontSize: 16,
            fontWeight: "400",
        },
        priceText: {
            fontSize: 16,
            color: "#333",
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 8,
        },
        detailLabel: {
            fontSize: 14,
            color: "#555",
            flex: 1,
        },
        detailValue: {
            fontSize: 14,
            color: "#333",
            textAlign: 'right',
        },
    };

    return (
        <Box style={styles.container}>
            {/* Header */}
            <Box style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.5}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                >
                    <Icon as={ArrowLeftIcon} size="xl" color="white" />
                </TouchableOpacity>
                <Box style={styles.headerTitleContainer}>
                    <Text style={styles.header}>{data.headerTitle}</Text>
                </Box>
            </Box>

            {/* Items Card */}
            <Box style={styles.itemContainer}>
                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>Items</Text>

                <ScrollView>
                {data.items.map((item, index) => (
                    <Box style={styles.itemRow} key={index}>
                        <Checkbox
                            size="lg"
                            isChecked={item.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                        >
                            <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>{item.name}</CheckboxLabel>
                        </Checkbox>
                        <Text style={styles.priceText}>₱{item.price}</Text>
                    </Box>
                ))}
                </ScrollView>

                <Box style={styles.totalRow}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>Total</Text>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>₱{data.total || "0.00"}</Text>
                </Box>
            </Box>

            {/* Details Card */}
            <Box style={styles.detailContainer}>
                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>List Details</Text>
                <Box style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Created</Text>
                    <Text style={styles.detailValue}>{data.details.created}</Text>
                </Box>
                <Box style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Last Updated</Text>
                    <Text style={styles.detailValue}>{data.details.lastUpdated}</Text>
                </Box>
                <Box style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Items Completed</Text>
                    <Text style={styles.detailValue}>{data.details.itemsCompleted} / {data.items.length}</Text>
                </Box>
            </Box>
        </Box>
    );
}
