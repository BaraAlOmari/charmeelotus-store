let currentProduct = ''
let itemCounter = 0
let orderItems = []

// Product pricing
const pricing = {
    keychain: {
        base: 20,
        types: {
            string: 5,
            metal: 7,
            phone: 0
        }
    },
    flowers: {
        base: 35,
        types: {
            rose: 0,
            "baby's breath": 0,
            lily: 10,
            lavender: 7,
            other: 15
        }
    }
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
}

function openCustomizer(productType) {
    currentProduct = productType
    const modal = document.getElementById('customizerModal')
    const modalTitle = document.getElementById('modalTitle')

    let title = productType === 'keychain' ? 'Customize Your Keychains' : 'Customize Your Crocheted Flowers'
    modalTitle.textContent = title

    // Reset items
    orderItems = []
    itemCounter = 0
    document.getElementById('itemsContainer').innerHTML = ''

    // Add first item
    addNewItem()

    modal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
}

function addNewItem() {

    if (itemCounter >= 10) {
        alert('Maximum 10 items per order allowed!')
        return
    }

    itemCounter++
    const itemsContainer = document.getElementById('itemsContainer')

    let itemHTML = ''

    if (currentProduct === 'keychain') {
        itemHTML = `
            <div class="item-card p-6 rounded-xl mb-4" data-item-id="${itemCounter}">
              <div class="flex justify-between items-center mb-4">
                <h5 class="text-lg font-medium text-[rgb(126,123,97)]">Keychain #${itemCounter}</h5>
                ${itemCounter > 1 ? `<button type="button" onclick="removeItem(${itemCounter})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>` : ''}
              </div>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Keychain Type</label>
                  <select class="keychain-type w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" onchange="updatePrice()">
                    <option value="phone">Metal Phone Charm (+0 QR)</option>
                    <option value="string">String Charm (+5 QR)</option>
                    <option value="metal">Metal (+7 QR)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Design Theme</label>
                  <select class="keychain-theme w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" onchange="toggleCustomTheme(this)">
                    <option value="floral">Floral</option>
                    <option value="sea">Sea</option>
                    <option value="vintage">Vintage</option>
                    <option value="cherry">Cherry</option>
                    <option value="other">Other (Specify below)</option>
                  </select>
                </div>
                <div class="custom-theme-container hidden md:col-span-2">
                  <label class="block text-gray-700 font-medium mb-2">Custom Theme Description</label>
                  <input type="text" class="keychain-custom-theme w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" placeholder="Describe your custom theme">
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Color Preference</label>
                  <input type="text" class="keychain-color w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" placeholder="e.g., Pink, Blue, Red" required>
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                  <input type="number" class="keychain-quantity w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" min="1" max="10" value="1" onchange="updatePrice()" oninput="if(this.value > 10) this.value = 10;" required>
                </div>
              </div>
            </div>
          `
    } else if (currentProduct === 'flowers') {
        itemHTML = `
            <div class="item-card p-6 rounded-xl mb-4" data-item-id="${itemCounter}">
              <div class="flex justify-between items-center mb-4">
                <h5 class="text-lg font-medium text-[rgb(126,123,97)]">Flower #${itemCounter}</h5>
                ${itemCounter > 1 ? `<button type="button" onclick="removeItem(${itemCounter})" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>` : ''}
              </div>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Flower Type</label>
                  <select class="flower-type w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" onchange="updatePrice(); toggleFlowerColorOptions(this)">
                    <option value="rose">Rose (+0 QR)</option>
                    <option value="baby's breath">Baby's breath (+0 QR)</option>
                    <option value="lavender">Lavender (+7 QR)</option>
                    <option value="lily">Lily (+10 QR)</option>
                    <option value="other">Other (Specify below) (+15 QR)</option>
                  </select>
                </div>
                <div class="flower-colors-container">
                  <label class="block text-gray-700 font-medium mb-2">Flower Colors</label>
                  <select class="flower-colors w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none">
                    <option value="red">Red</option>
                    <option value="pink">Pink</option>
                    <option value="white">White</option>
                    <option value="blue">Blue</option>
                    <option value="cream white">Cream White</option>
                  </select>
                </div>
                <div class="other-flower-container hidden md:col-span-2">
                  <label class="block text-gray-700 font-medium mb-2">Custom Flower Description</label>
                  <input type="text" class="flower-custom w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" placeholder="Describe your custom flower">
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">Quantity</label>
                  <input type="number" class="flower-quantity w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:outline-none" min="1" max="3" value="1" onchange="updatePrice()" oninput="if(this.value > 3) this.value = 3;" required>
                </div>
              </div>
            </div>
          `
    }

    itemsContainer.insertAdjacentHTML('beforeend', itemHTML)
    updatePrice()
}

function removeItem(itemId) {
    const itemElement = document.querySelector(`[data-item-id="${itemId}"]`)
    if (itemElement) {
        itemElement.remove()
        updatePrice()
    }
}

function toggleCustomTheme(select) {
    const container = select.closest('.item-card').querySelector('.custom-theme-container')
    if (select.value === 'other') {
        container.classList.remove('hidden')
    } else {
        container.classList.add('hidden')
    }
}

function toggleFlowerColorOptions(select) {
    const container = select.closest('.item-card').querySelector('.flower-colors-container')
    const otherContainer = select.closest('.item-card').querySelector('.other-flower-container')

    if (select.value === 'lavender') {
        container.classList.add('hidden')
    } else {
        container.classList.remove('hidden')
    }

    if (select.value === 'other') {
        otherContainer.classList.remove('hidden')
    } else {
        otherContainer.classList.add('hidden')
    }
}

function updatePrice() {
    let total = 0
    const items = document.querySelectorAll('.item-card')

    items.forEach(item => {
        if (currentProduct === 'keychain') {
            const type = item.querySelector('.keychain-type').value
            const quantity = parseInt(item.querySelector('.keychain-quantity').value) || 1

            const basePrice = pricing.keychain.base
            const typePrice = pricing.keychain.types[type] || 0
            const itemTotal = (basePrice + typePrice) * quantity

            total += itemTotal
        } else if (currentProduct === 'flowers') {
            const type = item.querySelector('.flower-type').value
            const quantity = parseInt(item.querySelector('.flower-quantity').value) || 1

            const basePrice = pricing.flowers.base
            const typePrice = pricing.flowers.types[type] || 0
            const itemTotal = (basePrice + typePrice) * quantity

            total += itemTotal
        }
    })

    document.getElementById('totalPrice').textContent = `${total} QR`
}

function closeCustomizer() {
    document.getElementById('customizerModal').classList.add('hidden')
    document.getElementById('customizerForm').reset()
    orderItems = []
    itemCounter = 0
    document.body.style.overflow = 'auto'
}

function closeMessageModal() {
    document.getElementById('messageModal').classList.add('hidden')
}

function generateMessage() {
    const customerName = document.getElementById('customerName').value
    const phoneNumber = document.getElementById('phoneNumber').value
    const specialRequests = document.getElementById('specialRequests').value

    if (!customerName) {
        alert('Please fill in your name.')
        return
    }

    // Get all items first
    const items = document.querySelectorAll('.item-card')
    
    // Validation for keychain colors
    if (currentProduct === 'keychain') {
        for (let item of items) {
            const color = item.querySelector('.keychain-color').value.trim()
            if (!color) {
                alert('Please fill in the color preference for all keychain items.')
                return
            }
        }
    }

    // Validation for quantities and invalid values
    for (let item of items) {
        if (currentProduct === 'keychain') {
            const keychainQuantityInput = item.querySelector('.keychain-quantity')
            const keychainQuantity = parseInt(keychainQuantityInput.value)
            const keychainMaxQuantity = parseInt(keychainQuantityInput.getAttribute('max')) || 10

            if (keychainQuantity > keychainMaxQuantity || isNaN(keychainQuantity) || keychainQuantity < 1) {
                alert(`Maximum quantity per keychain item is ${keychainMaxQuantity}. Please adjust your quantities.`)
                return
            }
        } else if (currentProduct === 'flowers') {
            const flowerQuantityInput = item.querySelector('.flower-quantity')
            const flowerQuantity = parseInt(flowerQuantityInput.value)
            const flowerMaxQuantity = parseInt(flowerQuantityInput.getAttribute('max')) || 3

            if (flowerQuantity > flowerMaxQuantity || isNaN(flowerQuantity) || flowerQuantity < 1) {
                alert(`Maximum quantity per flower item is ${flowerMaxQuantity}. Please adjust your quantities.`)
                return
            }
        }
    }

    let orderDetails = ''
    let itemNumber = 1

    items.forEach(item => {
        if (currentProduct === 'keychain') {
            const type = item.querySelector('.keychain-type').value
            const theme = item.querySelector('.keychain-theme').value
            const customTheme = item.querySelector('.keychain-custom-theme')?.value || ''
            const color = item.querySelector('.keychain-color').value
            const quantity = item.querySelector('.keychain-quantity').value

            orderDetails += `\n🗝️ KEYCHAIN #${itemNumber}
Product: ${type.charAt(0).toUpperCase() + type.slice(1)} Keychain
Theme: ${theme}${customTheme ? ` (${customTheme})` : ''}
Color: ${color}
Quantity: ${quantity}`

        } else if (currentProduct === 'flowers') {
            const type = item.querySelector('.flower-type').value
            const colors = item.querySelector('.flower-colors')?.value || 'N/A'
            const customFlower = item.querySelector('.flower-custom')?.value || ''
            const quantity = item.querySelector('.flower-quantity').value

            orderDetails += `\n🌹 FLOWER #${itemNumber}
Product: ${type.charAt(0).toUpperCase() + type.slice(1)}${customFlower ? ` (${customFlower})` : ''}
Colors: ${type === 'lavender' ? 'Purple (default)' : colors}
Quantity: ${quantity}`
        }

        itemNumber++
    })

    const totalPrice = document.getElementById('totalPrice').textContent

    const fullMessage = `Hi! I'd like to place a custom order from Charmé Lotus 💖

👤 Customer Information:
Name: ${customerName}
Phone: ${phoneNumber || 'Not provided'}

📦 ORDER DETAILS:${orderDetails}

💰 Estimated Total: ${totalPrice}

${specialRequests ? `✨ Special Requests:\n${specialRequests}\n\n` : ''}Please confirm the order and estimated completion time. Thank you! 🌸`

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
    window.open('https://ig.me/m/charmeelotus', '_blank')
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
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

// Back to top button
const backToTopBtn = document.getElementById('backToTop')

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none')
    } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none')
    }
})

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})