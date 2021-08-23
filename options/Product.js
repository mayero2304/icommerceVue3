app.component("product", {
  template: /* vue-html */`
        <section class="product">
            <div class="product__thumbnails">
            <div v-for="(image, index) in product.images" :key="image.thumbnail" class="thumb"
                @click="activeImage = index" :class="{active: activeImage === index }"
                :style="{ backgroundImage: 'url('+product.images[index].thumbnail+')'}">
            </div>
            </div>
            <div class="product__image">
            <img :src="product.images[activeImage].image" alt="product.name" />
            </div>
        </section>
        <section class="description">
            <h4>{{product.name.toUpperCase()}} {{ product.stock === 0 ? "(._.)" : "♥‿♥" }}</h4>
            <span class="badge new" v-if="product.new">Nuevo</span>
            <span class="badge offer" v-if="product.offer">Oferta</span>
            <p class="description__status" v-if="product.stock === 3">Quedan pocas unidades</p>
            <p class="description__status" v-else-if="product.stock === 2">El producto esta por terminarse</p>
            <p class="description__status" v-else-if="product.stock === 1">Ultima unidad disponible</p>
            <p class="description__price" :style="{color: price_color}">$ {{new Intl.NumberFormat("es-CO").format(product.price)}}</p>
            <p class="description__content">
            </p>
            <div class="discount">
            <span>Codigo de Descuent:</span>
            <input @keyup.enter="applyDiscount($event)" type="text" placeholder="Ingresa tu codigo" />
            </div>
            <button @click="sendToCart()" :disabled="product.stock === 0">Agregar al carrito</button>
        </section>
    `,
  props: ["product"],
  emits: ["sendtocart"],
  data() {
    return {
      activeImage: 0,
      discountCodes: ["PLATZI20", "UDEMY10"],
      price_color: "rgb(104,104,209)",
    };
  },
  methods: {
    applyDiscount(event) {
      const discountCodeIndex = this.discountCodes.indexOf(event.target.value)
      if (discountCodeIndex >= 0) {
        this.product.price *= 50 / 100
        this.discountCodes.splice(discountCodeIndex, 1)
      }
    },
    sendToCart() {
      this.$emit("sendtocart", this.product)
    }
  },
  watch: {
    "product.stock"(stock) {
      if (stock <= 1) {
        this.price_color = "rgb(188,30,67)"
      }
    }
  },
})