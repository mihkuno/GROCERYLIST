import React, { useEffect, useState, useContext, useCallback } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon, ArrowLeftIcon } from "@/components/ui/icon";
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { SessionContext } from "@/provider/SessionProvider";


export default function Home() {

    const targetItem = useLocalSearchParams();
    const { getGroceryListDetails, updateGroceryListDetails } = useContext(SessionContext);


    const [data, setData] = useState(null);

         useFocusEffect(
            useCallback(() => {
                console.log('kani is in focus');    
    
                (async () => {
                    const response = await getGroceryListDetails(targetItem.id);      
                
                    // Calculate the total of checked items
                    const total = response.items
                        .filter(item => item.isChecked)
                        .reduce((sum, item) => sum + parseFloat(item.price), 0); // Directly parse price as a number
                
                    setData({
                        ...response,
                        total: total.toFixed(2), // Store the total as a string with 2 decimal places
                    });

                })();
    
                return () => {
                    console.log('kani is out of focus');
                    // Cleanup logic if needed
                };
            }, [])
        );

    const handleCheckboxChange = (index) => {
        const updatedItems = [...data.items];
        updatedItems[index].isChecked = !updatedItems[index].isChecked;
    
        // Count the number of checked items
        const itemsCompleted = updatedItems.filter(item => item.isChecked).length;
    
        // Calculate the total of checked items
        const total = updatedItems
            .filter(item => item.isChecked)
            .reduce((sum, item) => sum + parseFloat(item.price), 0); // Directly parse price as a number
    

        const updatedData = {
            ...data,
            items: updatedItems,
            details: {
                ...data.details,
                itemsCompleted,
            },
            total: total.toFixed(2), // Store the total as a string with 2 decimal places
        };

        setData(updatedData);
        (async () => await updateGroceryListDetails(updatedData))();
    };

    const styles = {
        headerContainer: {
            flexDirection: "row",
            alignItems: "center",
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
        },
        scrollView: {
            height: "100%",
            padding: 20,
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
            marginBottom: 50,
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
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {/* Header */}
            <Box style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    activeOpacity={0.5}
                    onPressIn={() => router.back()}
                    // onPressOut={() => setIsPressed(false)}
                >
                    <Icon as={ArrowLeftIcon} size="xl" color="white" />
                </TouchableOpacity>
                <Box style={styles.headerTitleContainer}>
                    <Text style={styles.header}>{data ? data.headerTitle : ''}</Text>
                </Box>
            </Box>

            {/* Items Card */}
            <Box style={styles.itemContainer}>
                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>Items</Text>

                {data && data.items.map((item, index) => (
                    <Box style={styles.itemRow} key={index}>
                        <Checkbox
                            size="lg"
                            isChecked={item.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                        >
                            <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>{item.name} <Text style={{fontSize: 12, color: 'grey'}}>x{item.quantity}</Text></CheckboxLabel>
                        </Checkbox>
                        <Text style={styles.priceText}>₱{item.price}</Text>
                    </Box>
                ))}

                <Box style={styles.totalRow}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>Total</Text>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>₱{data ? data.total : "0.00"}</Text>
                </Box>
            </Box>

            {/* Details Card */}
            <Box style={styles.detailContainer}>
                <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>List Details</Text>
                <Box style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Created</Text>
                    <Text style={styles.detailValue}>{data ? data.details.created : ''}</Text>
                </Box>
                <Box style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Last Updated</Text>
                    <Text style={styles.detailValue}>{data ? data.details.lastUpdated: ''}</Text>
                </Box>
                <Box style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Items Completed</Text>
                    <Text style={styles.detailValue}>{data ? data.details.itemsCompleted : ''} / {data ? data.items.length : ''}</Text>
                </Box>
            </Box>
        </ScrollView>
        </SafeAreaView>
    );
}
