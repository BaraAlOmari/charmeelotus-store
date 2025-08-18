let currentProduct = ''

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    })
}

function openCustomizer(productType) {
    currentProduct = productType
    const modal = document.getElementById('customizerModal')
    const modalTitle = document.getElementById('modalTitle')
    const productOptions = document.getElementById('productOptions')

    let title = ''
    let options = ''

    switch (productType) {
        case 'keychain':
            title = 'Customize Your Keychain'
            options = `
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Keychain Type</label>
                            <select id="keychainType" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none">
                                <option value="acrylic">Acrylic Keychain</option>
                                <option value="wooden">Wooden Keychain</option>
                                <option value="fabric">Fabric Keychain</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Design/Text</label>
                            <input type="text" id="keychainDesign" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" placeholder="Enter text or describe design" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Color Preference</label>
                            <input type="text" id="keychainColor" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" placeholder="e.g., Pink, Blue, Rainbow" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                            <input type="number" id="keychainQuantity" min="1" value="1" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" required>
                        </div>
                    `
            break
        case 'crochet':
            title = 'Customize Your Crochet Item'
            options = `
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Item Type</label>
                            <select id="crochetType" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none">
                                <option value="bag">Crochet Bag</option>
                                <option value="coaster">Coaster Set</option>
                                <option value="decoration">Home Decoration</option>
                                <option value="accessory">Other Accessory</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Size</label>
                            <select id="crochetSize" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none">
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="custom">Custom Size</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Color Scheme</label>
                            <input type="text" id="crochetColor" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" placeholder="e.g., Pastel Pink and White" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                            <input type="number" id="crochetQuantity" min="1" value="1" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" required>
                        </div>
                    `
            break
        case 'roses':
            title = 'Customize Your Crocheted Roses'
            options = `
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Rose Type</label>
                            <select id="roseType" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none">
                                <option value="single">Single Rose</option>
                                <option value="bouquet-small">Small Bouquet (3-5 roses)</option>
                                <option value="bouquet-medium">Medium Bouquet (6-9 roses)</option>
                                <option value="bouquet-large">Large Bouquet (10+ roses)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Rose Colors</label>
                            <input type="text" id="roseColors" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" placeholder="e.g., Deep Red, Pink and White Mix" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Stem Length</label>
                            <select id="roseStem" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none">
                                <option value="short">Short Stem (10cm)</option>
                                <option value="medium">Medium Stem (20cm)</option>
                                <option value="long">Long Stem (30cm)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-medium mb-2">Packaging</label>
                            <select id="rosePackaging" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none">
                                <option value="basic">Basic Wrapping</option>
                                <option value="gift">Gift Box</option>
                                <option value="premium">Premium Packaging</option>
                            </select>
                        </div>
                    `
            break
    }

    modalTitle.textContent = title
    productOptions.innerHTML = options
    modal.classList.remove('hidden')
}

function closeCustomizer() {
    document.getElementById('customizerModal').classList.add('hidden')
    document.getElementById('customizerForm').reset()
}

function closeMessageModal() {
    document.getElementById('messageModal').classList.add('hidden')
}

function generateMessage() {
    const customerName = document.getElementById('customerName').value
    const phoneNumber = document.getElementById('phoneNumber').value
    const specialRequests = document.getElementById('specialRequests').value

    if (!customerName || !phoneNumber) {
        alert('Please fill in your name and phone number.')
        return
    }

    let orderDetails = ''

    switch (currentProduct) {
        case 'keychain':
            const keychainType = document.getElementById('keychainType').value
            const keychainDesign = document.getElementById('keychainDesign').value
            const keychainColor = document.getElementById('keychainColor').value
            const keychainQuantity = document.getElementById('keychainQuantity').value

            orderDetails = `🗝️ KEYCHAIN ORDER

Product: ${keychainType.charAt(0).toUpperCase() + keychainType.slice(1)} Keychain
Design/Text: ${keychainDesign}
Color: ${keychainColor}
Quantity: ${keychainQuantity}`
            break

        case 'crochet':
            const crochetType = document.getElementById('crochetType').value
            const crochetSize = document.getElementById('crochetSize').value
            const crochetColor = document.getElementById('crochetColor').value
            const crochetQuantity = document.getElementById('crochetQuantity').value

            orderDetails = `🧶 CROCHET ORDER

Product: ${crochetType.charAt(0).toUpperCase() + crochetType.slice(1)}
Size: ${crochetSize.charAt(0).toUpperCase() + crochetSize.slice(1)}
Colors: ${crochetColor}
Quantity: ${crochetQuantity}`
            break

        case 'roses':
            const roseType = document.getElementById('roseType').value
            const roseColors = document.getElementById('roseColors').value
            const roseStem = document.getElementById('roseStem').value
            const rosePackaging = document.getElementById('rosePackaging').value

            orderDetails = `🌹 CROCHETED ROSES ORDER

Type: ${roseType.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
Colors: ${roseColors}
Stem Length: ${roseStem.charAt(0).toUpperCase() + roseStem.slice(1)}
Packaging: ${rosePackaging.charAt(0).toUpperCase() + rosePackaging.slice(1)}`
            break
    }

    const fullMessage = `Hi! I'd like to place a custom order from Charmé Lotus 💖

👤 Customer Information:
Name: ${customerName}
Phone: ${phoneNumber}

${orderDetails}

${specialRequests ? `✨ Special Requests:\n${specialRequests}\n\n` : ''}Please let me know the total price and estimated completion time. Thank you! 🌸`

    document.getElementById('generatedMessage').textContent = fullMessage
    document.getElementById('messageModal').classList.remove('hidden')
}

function copyMessage() {
    const message = document.getElementById('generatedMessage').textContent
    navigator.clipboard.writeText(message).then(() => {
        alert('Message copied to clipboard! 📋')
    })
}

function openInstagram() {
    window.open('https://instagram.com', '_blank')
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            })
        }
    })
})

// Add scroll animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in')
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0)'
        }
    })
})