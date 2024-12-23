import { Redirect } from 'expo-router';
import { ExpensesProvider } from '../components/ExpensesContext';



export default function Index() {
  return ( <Redirect href = '../overview'/>
  );
}
