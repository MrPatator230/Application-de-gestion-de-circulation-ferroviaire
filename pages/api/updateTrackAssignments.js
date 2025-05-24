export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const trackAssignments = req.body;

    // Sauvegarder les attributions dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('trackAssignmentsBySchedule', JSON.stringify(trackAssignments));
    }

    // Simuler un délai pour l'API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retourner une réponse de succès
    res.status(200).json({ 
      message: 'Track assignments updated successfully',
      data: trackAssignments 
    });
  } catch (error) {
    console.error('Error updating track assignments:', error);
    res.status(500).json({ 
      message: 'Error updating track assignments',
      error: error.message 
    });
  }
}
