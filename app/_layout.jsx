import { Stack } from 'expo-router'


const StackLayout = () => {
    
    return (
    <Stack>
        <Stack.Screen 
            name='(home)' 
            options={{
                headerShown : false,
                headerTitle : 'Home'
            }}
        />
        <Stack.Screen
            name='(add)'
            options={{
                headerShown : false,
                presentation : 'modal',
                animation : 'slide_from_bottom'
            }}
        />
    </Stack>
  )
}

export default StackLayout