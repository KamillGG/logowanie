import PocketBase from 'pocketbase';

const pb = new PocketBase('http://172.16.15.132:8080');
export default function Home() {
  return (
    <>
    {pb.authStore.model?(

        <h1>uzytkownik zalogowany</h1>
    ):(<h1>uzytkownik niezalogowany</h1>)}
    </>
  );
}
