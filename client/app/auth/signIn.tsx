import React, { useState, useContext, createRef } from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input, InputField } from "@/components/ui/input"
import { Icon, EyeOffIcon, EyeIcon, CloseIcon } from '@/components/ui/icon';
import { AntDesign } from '@expo/vector-icons'; // Import Google icon from AntDesign
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SessionContext } from '@/provider/SessionProvider';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErase, setShowErase] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const emailInput = createRef();
    const passwordInput = createRef();

    const { saveSession } = useContext(SessionContext);

    const styles = {
        brandName: {
            fontSize: 40,
            fontWeight: 800,
            color: '#FBF9F1',
            textAlign: 'center',
            padding: 40,
        },
        header: {
            fontSize: 32,
            fontWeight: 500,
            paddingTop: 40,  
            textAlign: 'center',
        },  
        subheader: {
            fontSize: 13,
            fontWeight: 500,
            marginTop: 10,
            marginBottom: 25,
            textAlign: 'center',
        },
        container: {
            backgroundColor: '#92C7CF',
            justifyContent: 'center',
            paddingVertical: '25%',
            paddingHorizontal: 20,
            height: '100%',
        },
        formContainer: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 35,
            justifyContent: 'center',
        },
        formInput: {
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            marginTop: 10,
            height: 50,
        },
        formIcon: {
            marginRight: 12,
            color: '#8c8c8c',
        },
        signInButton: {
            fontWeight: 'bold',
            backgroundColor: '#92C7CF',
            borderRadius: 10,
            marginTop: 15,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        signInButtonText: {
            fontWeight: 800,
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
        },
        googleButton: {
            backgroundColor: '#f5f5f5',
            borderColor: '#949494',
            borderRadius: 10,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        googleButtonText: {
            color: '#949494',
        },
        signInText: {
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 20,
            fontWeight: 'bold',
            color: '#B4B4B8',
        },
        signUpText: {
            fontWeight: 'bold',
        },
        signUpButton: {            
            fontWeight: 'bold', 
            color: '#92C7CF',
        },
        signUpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
        },
    };

    const handleEmailChanged = (text: string) => {
        setEmail(text);
        setShowErase(text.length > 0);
    }

    const handlePasswordChanged = (text: string) => {
        setPassword(text);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const clearEmail = () => {
        setEmail('');
        setShowErase(false);
        emailInput.current?.focus();
    }

    const clearPassword = () => {
        setPassword('');
    }

    const handleLogin = () => {
        setIsEmailInvalid(false);
        setIsPasswordInvalid(false);
        
        if (!email) {
            setIsEmailInvalid(true);
        }

        if (!password) {
            setIsPasswordInvalid(true);
        }

        if (email && password) {
            saveSession({ email, password });   
        }

    }

    const handleGoogle = () => {
        alert('Unavailable');
    };

    return (
    <Box style={styles.container}>
        <Text style={styles.brandName}>GroceryList</Text>
        <Box style={styles.formContainer}>

            <Text style={styles.header}>Get Started</Text>
            <Text style={styles.subheader}>Let's get started by filling out the form below.</Text>

            <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={isEmailInvalid} isReadOnly={false}>
                <InputField 
                    ref={emailInput} 
                    placeholder="Email" 
                    onChangeText={handleEmailChanged} 
                    value={email} 
                />
                {showErase && (
                    <Button variant="link" onPress={clearEmail}>
                        <Icon as={CloseIcon} size="xl" style={styles.formIcon} />
                    </Button>
                )}
            </Input>

            <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={isPasswordInvalid} isReadOnly={false}>
                <InputField 
                    ref={passwordInput} 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    onChangeText={handlePasswordChanged}
                    value={password} 
                />
                <Button variant="link" onPress={togglePasswordVisibility}>
                    <Icon as={showPassword ? EyeOffIcon : EyeIcon} size="xl" style={styles.formIcon} />
                </Button>

                {password && (
                    <Button variant="link" onPress={clearPassword}>
                        <Icon as={CloseIcon} size="xl" style={styles.formIcon} />
                    </Button>
                )}
            </Input>

            <TouchableOpacity 
                style={styles.signInButton}
                activeOpacity={0.6}
                onPress={handleLogin}
            >
                <Text style={styles.signInButtonText}>Log In</Text>
            </TouchableOpacity>

            <Text style={styles.signInText}>Or sign in with</Text>

            <TouchableOpacity 
                style={styles.googleButton}
                activeOpacity={0.6}
                onPress={handleGoogle}
            >
                <AntDesign name="google" size={24} color="#949494" style={{ marginRight: 10 }} />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <Box style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => router.replace('/auth/signUp')}
                    activeOpacity={0.6}
                >
                    <Text style={styles.signUpButton}>Sign Up Here</Text>
                </TouchableOpacity>
            </Box>
        </Box>
    </Box>
    );
}
