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
            <p class="description__price" :style="{color: price_color }">$ {{new Intl.NumberFormat("es-CO").format(product.price)}}</p>
            <p class="description__content">
            </p>
            <div class="discount">
            <span>Codigo de Descuent:</span>
            <input @keyup.enter="applayDiscount($event)" type="text" placeholder="Ingresa tu codigo" />
            </div>
            <button @click="sendToCart()" :disabled="product.stock === 0">Agregar al carrito</button>
        </section>
    `,
    props: ["product"],
    emits: ["sendtocart"],
    setup(props, context) {
        const productState = reactive({
            activeImage: 0,
            price_color: "rgb(104,104,209)"
        });

        const discountCodes = ref(["platzi20", "platzi10"]);
        function applayDiscount(event) {
            console.log(event.target.value)
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value)
            if (discountCodeIndex >= 0) {
                props.product.price *= 50 / 100
                discountCodes.value.splice(discountCodeIndex, 1)
            }
        };
        watch(() => productState.activeImage, (val, oldValue) => {
            console.log(val, oldValue)
        })
        watch(() => props.product.stock, (stock) => {
            if (stock <= 1) productState.price_color = "rgb(188,30,67)"
        })
        function sendToCart() {
            context.emit("sendtocart", props.product);
        };
        return {
            ...toRefs(productState),

            applayDiscount,
            sendToCart,
        }
    }
})