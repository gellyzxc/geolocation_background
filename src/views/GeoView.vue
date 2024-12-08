<template>
  <div>
    <p>Запуск геолокации:
      <button @click="startTracking">Начать</button>
    </p>
    <p>Остановка геолокации:
      <button @click="stopTracking">Остановить</button>
    </p>
  </div>
</template>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>

<script>
import {CapacitorHttp, registerPlugin} from "@capacitor/core";
const BackgroundGeolocation = registerPlugin("BackgroundGeolocation");

export default {
  name: "GeoView",
  data() {
    return {
      watcherId: null, // ID для наблюдателя
    };
  },
  methods: {
    async sendGeo(payload) {
      await CapacitorHttp.get(
          {
            url: `https://testsssss.free.beeceptor.com?data=${JSON.stringify(payload)}`
          }
        );
    },
    async startTracking() {
      try {
        await BackgroundGeolocation.addWatcher(
            {
              requestPermissions: true,
              distanceFilter: 0, // Обновления каждые 10 метров
              // requestPermissions: true,
              backgroundMessage: "Геолокация отслеживается в фоновом режиме",
              backgroundTitle: "Геолокация в фоновом режиме",

            },
            async (location, error) => {
              if (error) {
                console.error("Ошибка при обновлении геолокации:", error);
                return;
              }

              console.log("Текущее местоположение:", location);
              await this.sendGeo(location);
            }
        ).then((id) => {
          this.watcherId = id
        });
        console.log("Фоновое отслеживание геолокации начато.");
      } catch (error) {
        console.error("Ошибка инициализации фона:", error);
      }
    },
    async stopTracking() {
      try {
        if (this.watcherId) {
          await BackgroundGeolocation.removeWatcher({
            id: this.watcherId,
          });
          this.watcherId = null;
          console.log("Геолокация остановлена.");
        } else {
          console.log("Нет активного отслеживания.");
        }
      } catch (error) {
        console.error("Ошибка при остановке геолокации:", error);
      }
    },
  },
  beforeDestroy() {
    this.stopTracking();
  },
};
</script>
