import React, { useState, createRef } from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input, InputField } from "@/components/ui/input"
import { Icon, EyeOffIcon, EyeIcon, CloseIcon } from '@/components/ui/icon';
import { AntDesign } from '@expo/vector-icons'; // Import Google icon from AntDesign

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErase, setShowErase] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginPressed, setIsLoginPressed] = useState(false); 
    const [isGooglePressed, setIsGooglePressed] = useState(false); 
    const [isSignUpPressed, setIsSignUpPressed] = useState(false); 

    const emailInput = createRef();
    const passwordInput = createRef();

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
            flex: 1,
            justifyContent: 'center',
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 15,
            paddingRight: 15,
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
            opacity: isLoginPressed ? 0.6 : 1,
        },
        googleButton: {
            backgroundColor: '#f5f5f5',
            borderColor: '#949494',
            borderRadius: 10,
            height: 50,
            opacity: isGooglePressed ? 0.6 : 1,
            flexDirection: 'row',
            alignItems: 'center',
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
            opacity: isSignUpPressed ? 0.6 : 1,
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

    const handleButtonPressIn = (button: string) => {
        if (button === 'login') setIsLoginPressed(true);
        if (button === 'google') setIsGooglePressed(true);
        if (button === 'signup') setIsSignUpPressed(true);
    }

    const handleButtonPressOut = (button: string) => {
        if (button === 'login') setIsLoginPressed(false);
        if (button === 'google') setIsGooglePressed(false);
        if (button === 'signup') setIsSignUpPressed(false);
    }

    return (
    <Box style={styles.container}>
        <Text style={styles.brandName}>GroceryList</Text>
        <Box style={styles.formContainer}>

            <Text style={styles.header}>Get Started</Text>
            <Text style={styles.subheader}>Let's get started by filling out the form below.</Text>

            <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
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

            <Input style={styles.formInput} variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField 
                    ref={passwordInput} 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    onChangeText={handlePasswordChanged}
                    value={password} 
                />
                {password && (
                    <Button variant="link" onPress={clearPassword}>
                        <Icon as={CloseIcon} size="xl" style={styles.formIcon} />
                    </Button>
                )}
                <Button variant="link" onPress={togglePasswordVisibility}>
                    <Icon as={showPassword ? EyeOffIcon : EyeIcon} size="xl" style={styles.formIcon} />
                </Button>
            </Input>

            <Button 
                size="xl" 
                variant="solid" 
                action="primary" 
                style={styles.signInButton}
                onPressIn={() => handleButtonPressIn('login')} 
                onPressOut={() => handleButtonPressOut('login')}
            >
                <ButtonText>Log In</ButtonText>
            </Button>

            <Text style={styles.signInText}>Or sign in with</Text>

            <Button 
                size="lg" 
                variant="outline" 
                action="primary" 
                style={styles.googleButton}
                onPressIn={() => handleButtonPressIn('google')} 
                onPressOut={() => handleButtonPressOut('google')}
            >
                <AntDesign name="google" size={24} color="#949494" style={{ marginRight: 10 }} />
                <ButtonText style={styles.googleButtonText}>Continue with Google</ButtonText>
            </Button>

            <Box style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <Button 
                    style={styles.signUpButton}
                    onPressIn={() => handleButtonPressIn('signup')} 
                    onPressOut={() => handleButtonPressOut('signup')}
                    variant="link"
                >
                    <Text style={styles.signUpButton}>Sign Up Here</Text>
                </Button>
            </Box>
        </Box>
    </Box>
    );
}
