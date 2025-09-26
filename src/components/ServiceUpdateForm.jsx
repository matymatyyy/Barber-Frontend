
function ServiceCard({ service }) {

<form //</>onSubmit={handleUpdate}
        >
    <h3>
      <input 
        type="text" 
        placeholder={service.type}
        value={type}
        onChange={(e) => setType(e.target.value)} 
      />
    </h3>
    <p>
      <input 
        ype="text" 
        placeholder={service.price}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
  </p>
  <p>ID: {service.id}</p>
</form>

}