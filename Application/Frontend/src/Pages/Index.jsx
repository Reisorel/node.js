import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Index() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate("/");
  };

  // Utiliser useEffect pour aller chercher les données automatiquement lors du chargement
  useEffect(() => {
    if (isVisible) {
      const fetchPokemons = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/pokemons");
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des pokémons");
          }
          const data = await response.json();

          // Tri les pokémons par ID
          const sortedPokemons = data.data.sort((a, b) => a.id - b.id);
          setPokemons(sortedPokemons);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchPokemons(); // Appel de la fonction asynchrone pour récupérer les Pokémon
    }
  }, [isVisible]); // Déclenche cet effet seulement quand isVisible change

  return (
    <div>
      <h1>Welcome to the index pokemon!</h1>
      <Button
        text="Click here to go back to the landing"
        onClick={goToLanding}
      />
      <Button
        text={
          isVisible
            ? "Click here to hide all pokemons"
            : "Click here to display all pokémons"
        }
        onClick={() => setIsVisible(!isVisible)} // Bascule la visibilité
      />
      {/* Afficher les pokémons */}
      {error && <p>{error}</p>} {/* Afficher une erreur si elle existe */}
      {isVisible && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td>{pokemon.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Afficher une erreur si elle existe */}
      {error && <p>{error}</p>}
    </div>
  );
}
